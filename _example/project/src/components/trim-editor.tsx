"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Play, Pause, RotateCcw, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_RANGE = 60;
const MIN_RANGE = 5;

interface TrimEditorProps {
  file: File;
  duration: number;
  onApply: (start: number, end: number) => void;
  onCancel: () => void;
}

function formatMMSS(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function parseMMSS(str: string): number | null {
  const match = str.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  return parseInt(match[1]) * 60 + parseInt(match[2]);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function TrimEditor({ file, duration, onApply, onCancel }: TrimEditorProps) {
  const isVideo = file.type.startsWith("video/");
  const initialEnd = Math.min(MAX_RANGE, duration);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(initialEnd);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [dragging, setDragging] = useState<"start" | "end" | "region" | null>(null);

  const [startInput, setStartInput] = useState(formatMMSS(0));
  const [endInput, setEndInput] = useState(formatMMSS(initialEnd));

  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number>(0);
  const mediaUrlRef = useRef<string>("");
  const dragStartRef = useRef<{ x: number; startT: number; endT: number }>({ x: 0, startT: 0, endT: 0 });

  // Create object URL for media preview
  useEffect(() => {
    mediaUrlRef.current = URL.createObjectURL(file);
    return () => {
      URL.revokeObjectURL(mediaUrlRef.current);
    };
  }, [file]);

  // Sync input fields when times change (not during manual input)
  useEffect(() => {
    setStartInput(formatMMSS(startTime));
  }, [startTime]);

  useEffect(() => {
    setEndInput(formatMMSS(endTime));
  }, [endTime]);

  // Playback loop
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    const media = mediaRef.current;
    if (!media) return;

    const tick = () => {
      if (media.currentTime >= endTime) {
        media.pause();
        setIsPlaying(false);
        setPlayhead(endTime);
        return;
      }
      setPlayhead(media.currentTime);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, endTime]);

  const togglePlay = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
      setIsPlaying(false);
    } else {
      if (media.currentTime < startTime || media.currentTime >= endTime) {
        media.currentTime = startTime;
      }
      media.play();
      setIsPlaying(true);
    }
  }, [isPlaying, startTime, endTime]);

  const seekTo = useCallback((time: number) => {
    const media = mediaRef.current;
    if (media) media.currentTime = time;
    setPlayhead(time);
  }, []);

  // --- Range constraint helpers ---
  const applyRange = useCallback((newStart: number, newEnd: number) => {
    newStart = clamp(newStart, 0, duration);
    newEnd = clamp(newEnd, 0, duration);
    if (newEnd - newStart > MAX_RANGE) {
      newEnd = newStart + MAX_RANGE;
    }
    if (newEnd - newStart < MIN_RANGE) {
      if (newEnd < duration - MIN_RANGE) {
        newEnd = newStart + MIN_RANGE;
      } else {
        newStart = newEnd - MIN_RANGE;
      }
    }
    newStart = clamp(newStart, 0, duration);
    newEnd = clamp(newEnd, 0, duration);
    setStartTime(newStart);
    setEndTime(newEnd);
  }, [duration]);

  // --- Pointer event handlers for timeline ---
  const getTimeFromPointer = useCallback((clientX: number): number => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return ratio * duration;
  }, [duration]);

  const handlePointerDown = useCallback((e: React.PointerEvent, target: "start" | "end" | "region") => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(target);
    dragStartRef.current = { x: e.clientX, startT: startTime, endT: endTime };
  }, [startTime, endTime]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    const time = getTimeFromPointer(e.clientX);

    if (dragging === "start") {
      const newStart = clamp(time, 0, endTime - MIN_RANGE);
      const newEnd = newStart + MAX_RANGE < endTime ? endTime : newStart + MAX_RANGE;
      applyRange(newStart, Math.min(newEnd, endTime));
      seekTo(newStart);
    } else if (dragging === "end") {
      const newEnd = clamp(time, startTime + MIN_RANGE, duration);
      const newStart = newEnd - MAX_RANGE > startTime ? startTime : newEnd - MAX_RANGE;
      applyRange(Math.max(newStart, startTime), newEnd);
      seekTo(newEnd);
    } else if (dragging === "region") {
      const dx = e.clientX - dragStartRef.current.x;
      const rect = timelineRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dt = (dx / rect.width) * duration;
      const rangeDur = dragStartRef.current.endT - dragStartRef.current.startT;
      let newStart = dragStartRef.current.startT + dt;
      newStart = clamp(newStart, 0, duration - rangeDur);
      applyRange(newStart, newStart + rangeDur);
    }
  }, [dragging, startTime, endTime, duration, applyRange, getTimeFromPointer, seekTo]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  // --- Time input handlers ---
  const handleStartInputBlur = useCallback(() => {
    const parsed = parseMMSS(startInput);
    if (parsed !== null) {
      applyRange(parsed, endTime);
      seekTo(parsed);
    } else {
      setStartInput(formatMMSS(startTime));
    }
  }, [startInput, endTime, startTime, applyRange, seekTo]);

  const handleEndInputBlur = useCallback(() => {
    const parsed = parseMMSS(endInput);
    if (parsed !== null) {
      applyRange(startTime, parsed);
      seekTo(parsed);
    } else {
      setEndInput(formatMMSS(endTime));
    }
  }, [endInput, startTime, endTime, applyRange, seekTo]);

  const handleReset = useCallback(() => {
    applyRange(0, Math.min(MAX_RANGE, duration));
    seekTo(0);
    setIsPlaying(false);
    mediaRef.current?.pause();
  }, [duration, applyRange, seekTo]);

  // --- Computed values ---
  const selectedDuration = endTime - startTime;
  const startPct = (startTime / duration) * 100;
  const endPct = (endTime / duration) * 100;
  const playheadPct = (playhead / duration) * 100;

  // Time markers
  const markerInterval = duration > 180 ? 30 : 15;
  const markers: number[] = [];
  for (let t = 0; t <= duration; t += markerInterval) {
    markers.push(t);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-card rounded-3xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            구간 자르기
          </h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media preview */}
        <div className="px-5 pt-4">
          <div className="relative bg-black rounded-2xl overflow-hidden flex items-center justify-center">
            {isVideo ? (
              <video
                ref={mediaRef as React.Ref<HTMLVideoElement>}
                src={mediaUrlRef.current}
                className="w-full max-h-[40vh] object-contain"
                playsInline
                muted={false}
                preload="auto"
                onClick={togglePlay}
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center">
                <audio
                  ref={mediaRef as React.Ref<HTMLAudioElement>}
                  src={mediaUrlRef.current}
                  preload="auto"
                />
              </div>
            )}
            {/* Play/pause overlay */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30"
              >
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-6 h-6 text-black ml-0.5" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Time inputs + duration */}
        <div className="px-5 pt-4 flex items-center gap-3">
          <input
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            onBlur={handleStartInputBlur}
            onKeyDown={(e) => e.key === "Enter" && handleStartInputBlur()}
            className="w-16 text-center text-sm font-mono bg-secondary border border-border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <span className="text-muted-foreground">—</span>
          <input
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            onBlur={handleEndInputBlur}
            onKeyDown={(e) => e.key === "Enter" && handleEndInputBlur()}
            className="w-16 text-center text-sm font-mono bg-secondary border border-border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <div className="ml-auto text-sm text-muted-foreground font-mono">
            {formatMMSS(selectedDuration)}
          </div>
        </div>

        {/* Timeline */}
        <div className="px-5 pt-4 pb-2">
          <div
            ref={timelineRef}
            className="relative h-12 bg-secondary rounded-lg select-none touch-none"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Dimmed regions (outside selection) */}
            <div
              className="absolute inset-y-0 left-0 bg-black/40 rounded-l-lg pointer-events-none"
              style={{ width: `${startPct}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 bg-black/40 rounded-r-lg pointer-events-none"
              style={{ width: `${100 - endPct}%` }}
            />

            {/* Selected region (draggable) */}
            <div
              className="absolute inset-y-0 bg-brand/20 cursor-grab active:cursor-grabbing"
              style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
              onPointerDown={(e) => handlePointerDown(e, "region")}
            />

            {/* Playhead */}
            {playhead >= startTime && playhead <= endTime && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none z-10"
                style={{ left: `${playheadPct}%` }}
              />
            )}

            {/* Start handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-col-resize"
              style={{ left: `${startPct}%` }}
              onPointerDown={(e) => handlePointerDown(e, "start")}
            >
              <div className={`w-5 h-10 rounded-md border-2 border-white shadow-lg transition-colors ${dragging === "start" ? "bg-brand scale-110" : "bg-brand/80"}`} />
            </div>

            {/* End handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-col-resize"
              style={{ left: `${endPct}%` }}
              onPointerDown={(e) => handlePointerDown(e, "end")}
            >
              <div className={`w-5 h-10 rounded-md border-2 border-white shadow-lg transition-colors ${dragging === "end" ? "bg-brand scale-110" : "bg-brand/80"}`} />
            </div>
          </div>

          {/* Time markers */}
          <div className="relative h-5 mt-1">
            {markers.map((t) => (
              <span
                key={t}
                className="absolute text-[10px] text-muted-foreground -translate-x-1/2 font-mono"
                style={{ left: `${(t / duration) * 100}%` }}
              >
                {formatMMSS(t)}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-5 pt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            되돌리기
          </Button>
          <Button
            className="flex-1 rounded-xl bg-brand hover:bg-brand/90"
            onClick={() => onApply(startTime, endTime)}
          >
            자르기 적용
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
