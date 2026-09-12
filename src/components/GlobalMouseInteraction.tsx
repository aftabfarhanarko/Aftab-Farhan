"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

type CursorState =
  | "normal"
  | "link"
  | "button"
  | "project"
  | "image"
  | "external"
  | "magnetic";

export default function GlobalMouseInteraction() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    const dot = dotRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!dot || !follower || !label) return;

    // ------------------------------------------------------------
    // CONFIG
    // ------------------------------------------------------------

    const CONFIG = {
      dotDuration: 0.08,
      followerDuration: 0.34,
      labelDuration: 0.42,

      magneticDuration: 0.32,
      magneticReturnDuration: 0.55,

      imageDuration: 0.3,
      imageReturnDuration: 0.45,

      cursorEnterDuration: 0.45,
      cursorLeaveDuration: 0.3,

      projectImageScale: 1.025,
      projectImageMaxX: 12,
      projectImageMaxY: 9,
      projectImageRotation: 0.8,

      titleMaxX: 4,
      titleMaxY: 3,

      velocityThreshold: 16,
      velocityMaxStretch: 0.075,
    };

    // ------------------------------------------------------------
    // STATE
    // ------------------------------------------------------------

    let mounted = true;
    let visible = false;

    let cursorState: CursorState = "normal";
    let currentLabel = "";

    let currentMagnetic: HTMLElement | null = null;
    let currentParallax: HTMLElement | null = null;
    let currentTitle: HTMLElement | null = null;
    let currentHoverX: HTMLElement | null = null;
    let currentHoverY: HTMLElement | null = null;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let idleTween: gsap.core.Tween | null = null;

    let labelTimeline: gsap.core.Timeline | null = null;
    let velocityTween: gsap.core.Tween | null = null;

    let lastX = 0;
    let lastY = 0;

    // ------------------------------------------------------------
    // INITIAL GSAP SETUP
    // ------------------------------------------------------------

    gsap.set(dot, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 1,
      force3D: true,
    });

    gsap.set(follower, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 1,
      width: 36,
      height: 36,
      borderRadius: 999,
      force3D: true,
    });

    gsap.set(label, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.85,
      force3D: true,
    });

    // ------------------------------------------------------------
    // HIGH PERFORMANCE CURSOR CONTROLLERS
    // ------------------------------------------------------------

    const xDotTo = gsap.quickTo(dot, "x", {
      duration: CONFIG.dotDuration,
      ease: "power3.out",
    });

    const yDotTo = gsap.quickTo(dot, "y", {
      duration: CONFIG.dotDuration,
      ease: "power3.out",
    });

    const xFollowerTo = gsap.quickTo(follower, "x", {
      duration: CONFIG.followerDuration,
      ease: "power3.out",
    });

    const yFollowerTo = gsap.quickTo(follower, "y", {
      duration: CONFIG.followerDuration,
      ease: "power3.out",
    });

    const xLabelTo = gsap.quickTo(label, "x", {
      duration: CONFIG.labelDuration,
      ease: "power3.out",
    });

    const yLabelTo = gsap.quickTo(label, "y", {
      duration: CONFIG.labelDuration,
      ease: "power3.out",
    });

    // ------------------------------------------------------------
    // HELPER: KILL IDLE
    // ------------------------------------------------------------

    const stopIdle = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }

      if (idleTween) {
        idleTween.kill();
        idleTween = null;
      }

      gsap.to(follower, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    };

    // ------------------------------------------------------------
    // HELPER: START IDLE
    // ------------------------------------------------------------

    const startIdle = () => {
      stopIdle();

      idleTimer = setTimeout(() => {
        if (!mounted || cursorState !== "normal") return;

        idleTween = gsap.to(follower, {
          scale: 1.035,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, 2600);
    };

    // ------------------------------------------------------------
    // LABEL MORPH
    // ------------------------------------------------------------

    const setLabel = (text: string) => {
      if (!mounted) return;

      if (currentLabel === text) return;

      currentLabel = text;

      if (labelTimeline) {
        labelTimeline.kill();
      }

      const hasExistingLabel = Boolean(label.textContent);

      labelTimeline = gsap.timeline();

      if (hasExistingLabel) {
        labelTimeline
          .to(label, {
            opacity: 0,
            y: -5,
            scale: 0.84,
            duration: 0.12,
            ease: "power2.in",
          })
          .call(() => {
            label.textContent = text;
          })
          .fromTo(
            label,
            {
              opacity: 0,
              y: 5,
              scale: 0.84,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.24,
              ease: "power3.out",
            }
          );
      } else {
        label.textContent = text;

        labelTimeline.fromTo(
          label,
          {
            opacity: 0,
            y: 7,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "power3.out",
          }
        );
      }
    };

    // ------------------------------------------------------------
    // CLEAR LABEL
    // ------------------------------------------------------------

    const clearLabel = () => {
      if (!currentLabel && !label.textContent) return;

      currentLabel = "";

      if (labelTimeline) {
        labelTimeline.kill();
      }

      labelTimeline = gsap.timeline({
        onComplete: () => {
          if (mounted) {
            label.textContent = "";
          }
        },
      });

      labelTimeline.to(label, {
        opacity: 0,
        y: 4,
        scale: 0.84,
        duration: 0.16,
        ease: "power2.inOut",
      });
    };

    // ------------------------------------------------------------
    // CURSOR VISUAL STATE
    // ------------------------------------------------------------

    const applyCursorState = (
      nextState: CursorState,
      nextLabel?: string
    ) => {
      if (
        cursorState === nextState &&
        currentLabel === (nextLabel || "")
      ) {
        return;
      }

      cursorState = nextState;

      stopIdle();

      switch (nextState) {
        // --------------------------------------------------------
        // NORMAL
        // --------------------------------------------------------

        case "normal": {
          clearLabel();

          gsap.to(follower, {
            width: 36,
            height: 36,
            borderRadius: 999,
            scale: 1,
            backgroundColor: "rgba(22, 163, 74, 0.08)",
            borderColor: "rgba(34, 197, 94, 0.32)",
            boxShadow: "none",
            duration: 0.34,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
          });

          startIdle();
          break;
        }

        // --------------------------------------------------------
        // LINK
        // --------------------------------------------------------

        case "link": {
          setLabel(nextLabel || "OPEN ↗");

          gsap.to(follower, {
            width: 86,
            height: 36,
            borderRadius: 18,
            scale: 1,
            backgroundColor: "rgba(22, 163, 74, 0.18)",
            borderColor: "rgba(34, 197, 94, 0.65)",
            boxShadow: "0 0 24px rgba(22, 163, 74, 0.18)",
            duration: 0.34,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, {
            opacity: 0.8,
            scale: 1.15,
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
          });

          break;
        }

        // --------------------------------------------------------
        // BUTTON
        // --------------------------------------------------------

        case "button": {
          setLabel(nextLabel || "OPEN ↗");

          gsap.to(follower, {
            width: 92,
            height: 38,
            borderRadius: 19,
            scale: 1,
            backgroundColor: "rgba(22, 163, 74, 0.2)",
            borderColor: "rgba(34, 197, 94, 0.7)",
            boxShadow: "0 0 28px rgba(22, 163, 74, 0.2)",
            duration: 0.34,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, {
            opacity: 0,
            scale: 0,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
          });

          break;
        }

        // --------------------------------------------------------
        // PROJECT
        // --------------------------------------------------------

        case "project": {
          setLabel(nextLabel || "VIEW PROJECT ↗");

          gsap.to(follower, {
            width: 142,
            height: 44,
            borderRadius: 22,
            scale: 1,
            backgroundColor: "rgba(22, 163, 74, 0.88)",
            borderColor: "rgba(74, 222, 128, 0.95)",
            boxShadow: "0 14px 38px -8px rgba(22, 163, 74, 0.4)",
            duration: 0.38,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, {
            opacity: 0,
            scale: 0,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
          });

          break;
        }

        // --------------------------------------------------------
        // IMAGE
        // --------------------------------------------------------

        case "image": {
          setLabel("EXPLORE ↗");

          gsap.to(follower, {
            width: 112,
            height: 40,
            borderRadius: 20,
            scale: 1,
            backgroundColor: "rgba(15, 23, 42, 0.82)",
            borderColor: "rgba(255, 255, 255, 0.48)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.28)",
            duration: 0.34,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, {
            opacity: 0,
            scale: 0,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
          });

          break;
        }

        // --------------------------------------------------------
        // EXTERNAL
        // --------------------------------------------------------

        case "external": {
          setLabel(nextLabel || "VISIT ↗");

          gsap.to(follower, {
            width: 88,
            height: 38,
            borderRadius: 19,
            scale: 1,
            backgroundColor: "rgba(255, 96, 20, 0.2)",
            borderColor: "rgba(255, 120, 50, 0.8)",
            boxShadow: "0 0 24px rgba(255, 96, 20, 0.2)",
            duration: 0.34,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, {
            opacity: 0,
            scale: 0,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
          });

          break;
        }

        // --------------------------------------------------------
        // MAGNETIC
        // --------------------------------------------------------

        case "magnetic": {
          setLabel(nextLabel || "CONTACT ↗");

          gsap.to(follower, {
            width: 108,
            height: 40,
            borderRadius: 20,
            scale: 1,
            backgroundColor: "rgba(255, 96, 20, 0.9)",
            borderColor: "rgba(255, 140, 80, 1)",
            boxShadow: "0 12px 30px -6px rgba(255, 96, 20, 0.4)",
            duration: 0.34,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(dot, {
            opacity: 0,
            scale: 0,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
          });

          break;
        }
      }
    };

    // ------------------------------------------------------------
    // MAGNETIC RETURN
    // ------------------------------------------------------------

    const resetMagnetic = (element: HTMLElement | null) => {
      if (!element) return;

      gsap.to(element, {
        x: 0,
        y: 0,
        duration: CONFIG.magneticReturnDuration,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
      });
    };

    // ------------------------------------------------------------
    // PARALLAX RETURN
    // ------------------------------------------------------------

    const resetParallax = (element: HTMLElement | null) => {
      if (!element) return;

      const mouseLayer =
        (element.querySelector(
          ".project-image-mouse-layer"
        ) as HTMLElement | null) || element;

      gsap.to(mouseLayer, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: CONFIG.imageReturnDuration,
        ease: "power3.out",
        overwrite: true,
      });

      const title = element.querySelector(
        "[data-cursor-title-parallax]"
      ) as HTMLElement | null;

      if (title) {
        gsap.to(title, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    // ------------------------------------------------------------
    // HOVER X/Y RESET
    // ------------------------------------------------------------

    const resetHoverX = (element: HTMLElement | null) => {
      if (!element) return;

      gsap.to(element, {
        x: 0,
        scale: 1,
        duration: 0.38,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const resetHoverY = (element: HTMLElement | null) => {
      if (!element) return;

      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.38,
        ease: "power3.out",
        overwrite: true,
      });
    };

    // ------------------------------------------------------------
    // POINTER MOVE
    // ------------------------------------------------------------

    const handlePointerMove = (event: PointerEvent) => {
      if (!mounted) return;

      const { clientX, clientY } = event;

      // ----------------------------------------------------------
      // FIRST MOVEMENT
      // ----------------------------------------------------------

      if (!visible) {
        visible = true;

        gsap.to([dot, follower], {
          opacity: 1,
          scale: 1,
          duration: CONFIG.cursorEnterDuration,
          ease: "power3.out",
          overwrite: true,
        });

        lastX = clientX;
        lastY = clientY;
      }

      // ----------------------------------------------------------
      // CURSOR POSITION
      // ----------------------------------------------------------

      xDotTo(clientX);
      yDotTo(clientY);

      xFollowerTo(clientX);
      yFollowerTo(clientY);

      xLabelTo(clientX);
      yLabelTo(clientY);

      // ----------------------------------------------------------
      // VELOCITY
      // ----------------------------------------------------------

      const dx = clientX - lastX;
      const dy = clientY - lastY;

      const speed = Math.min(Math.hypot(dx, dy), 80);

      if (
        speed > CONFIG.velocityThreshold &&
        cursorState === "normal"
      ) {
        const stretch = Math.min(
          CONFIG.velocityMaxStretch,
          speed * 0.001
        );

        const angle =
          Math.atan2(dy, dx) * (180 / Math.PI);

        if (velocityTween) {
          velocityTween.kill();
        }

        velocityTween = gsap.to(follower, {
          scaleX: 1 + stretch,
          scaleY: 1 - stretch * 0.7,
          rotation: angle * 0.025,
          duration: 0.14,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            gsap.to(follower, {
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
              duration: 0.28,
              ease: "power3.out",
              overwrite: true,
            });
          },
        });
      }

      lastX = clientX;
      lastY = clientY;

      // ----------------------------------------------------------
      // IDLE
      // ----------------------------------------------------------

      if (cursorState === "normal") {
        startIdle();
      } else {
        stopIdle();
      }

      // ----------------------------------------------------------
      // GLOBAL CSS VARIABLES
      // ----------------------------------------------------------

      document.documentElement.style.setProperty(
        "--mouse-x",
        `${clientX}px`
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        `${clientY}px`
      );

      // ----------------------------------------------------------
      // TARGET
      // ----------------------------------------------------------

      const target = event.target as HTMLElement | null;

      if (!target) return;

      // ----------------------------------------------------------
      // MAGNETIC
      // ----------------------------------------------------------

      const magnetic = target.closest(
        "[data-cursor-magnetic]"
      ) as HTMLElement | null;

      if (magnetic) {
        if (
          currentMagnetic &&
          currentMagnetic !== magnetic
        ) {
          resetMagnetic(currentMagnetic);
        }

        currentMagnetic = magnetic;

        const rect =
          magnetic.getBoundingClientRect();

        const centerX =
          rect.left + rect.width / 2;

        const centerY =
          rect.top + rect.height / 2;

        const maxOffset = parseFloat(
          magnetic.getAttribute(
            "data-magnetic-max"
          ) || "8"
        );

        const strength = parseFloat(
          magnetic.getAttribute(
            "data-magnetic-strength"
          ) || "0.25"
        );

        const magneticX = Math.max(
          -maxOffset,
          Math.min(
            maxOffset,
            (clientX - centerX) * strength
          )
        );

        const magneticY = Math.max(
          -maxOffset,
          Math.min(
            maxOffset,
            (clientY - centerY) * strength
          )
        );

        gsap.to(magnetic, {
          x: magneticX,
          y: magneticY,
          duration: CONFIG.magneticDuration,
          ease: "power3.out",
          overwrite: true,
        });
      } else if (currentMagnetic) {
        resetMagnetic(currentMagnetic);
        currentMagnetic = null;
      }

      // ----------------------------------------------------------
      // IMAGE PARALLAX
      // ----------------------------------------------------------

      const parallax = target.closest(
        "[data-cursor-parallax]"
      ) as HTMLElement | null;

      if (parallax) {
        if (
          currentParallax &&
          currentParallax !== parallax
        ) {
          resetParallax(currentParallax);
        }

        currentParallax = parallax;

        const rect =
          parallax.getBoundingClientRect();

        if (rect.width > 0 && rect.height > 0) {
          const normalizedX =
            ((clientX - rect.left) /
              rect.width -
              0.5) *
            2;

          const normalizedY =
            ((clientY - rect.top) /
              rect.height -
              0.5) *
            2;

          const speed = parseFloat(
            parallax.getAttribute(
              "data-parallax-speed"
            ) || "10"
          );

          const scale = parseFloat(
            parallax.getAttribute(
              "data-parallax-scale"
            ) || String(
              CONFIG.projectImageScale
            )
          );

          const maxX =
            Math.min(
              speed,
              CONFIG.projectImageMaxX
            );

          const maxY =
            Math.min(
              speed * 0.75,
              CONFIG.projectImageMaxY
            );

          const mouseLayer =
            (parallax.querySelector(
              ".project-image-mouse-layer"
            ) as HTMLElement | null) ||
            parallax;

          gsap.to(mouseLayer, {
            x: normalizedX * maxX,
            y: normalizedY * maxY,
            rotate:
              normalizedX *
              CONFIG.projectImageRotation,
            scale,
            duration: CONFIG.imageDuration,
            ease: "power3.out",
            overwrite: true,
          });

          const title =
            parallax.querySelector(
              "[data-cursor-title-parallax]"
            ) as HTMLElement | null;

          if (title) {
            currentTitle = title;

            gsap.to(title, {
              x: -normalizedX * CONFIG.titleMaxX,
              y: -normalizedY * CONFIG.titleMaxY,
              duration: 0.34,
              ease: "power3.out",
              overwrite: true,
            });
          }
        }
      } else {
        if (currentParallax) {
          resetParallax(currentParallax);
          currentParallax = null;
        }

        currentTitle = null;
      }

      // ----------------------------------------------------------
      // HOVER X
      // ----------------------------------------------------------

      const hoverX = target.closest(
        "[data-cursor-hover-x]"
      ) as HTMLElement | null;

      if (hoverX) {
        currentHoverX = hoverX;

        const shiftX = parseFloat(
          hoverX.getAttribute(
            "data-cursor-hover-x"
          ) || "3"
        );

        gsap.to(hoverX, {
          x: shiftX,
          scale: 1.01,
          duration: 0.25,
          ease: "power3.out",
          overwrite: true,
        });
      } else if (currentHoverX) {
        resetHoverX(currentHoverX);
        currentHoverX = null;
      }

      // ----------------------------------------------------------
      // HOVER Y
      // ----------------------------------------------------------

      const hoverY = target.closest(
        "[data-cursor-hover-y]"
      ) as HTMLElement | null;

      if (hoverY) {
        currentHoverY = hoverY;

        const shiftY = parseFloat(
          hoverY.getAttribute(
            "data-cursor-hover-y"
          ) || "-3"
        );

        gsap.to(hoverY, {
          y: shiftY,
          scale: 1.02,
          duration: 0.25,
          ease: "power3.out",
          overwrite: true,
        });
      } else if (currentHoverY) {
        resetHoverY(currentHoverY);
        currentHoverY = null;
      }

      // ----------------------------------------------------------
      // CURSOR CONTEXT
      // ----------------------------------------------------------

      const cursorTarget = target.closest(
        "[data-cursor], [data-cursor-label], a, button"
      ) as HTMLElement | null;

      if (cursorTarget) {
        const cursorAttr =
          cursorTarget.getAttribute(
            "data-cursor"
          );

        const cursorLabel =
          cursorTarget.getAttribute(
            "data-cursor-label"
          );

        const isExternal =
          cursorTarget.tagName === "A" &&
          (
            cursorTarget.getAttribute(
              "target"
            ) === "_blank" ||
            cursorTarget
              .getAttribute("rel")
              ?.includes("noopener")
          );

        if (
          cursorAttr === "project"
        ) {
          applyCursorState(
            "project",
            cursorLabel ||
              "VIEW PROJECT ↗"
          );
        } else if (
          magnetic
        ) {
          applyCursorState(
            "magnetic",
            magnetic.getAttribute(
              "data-cursor-label"
            ) || "CONTACT ↗"
          );
        } else if (
          cursorAttr === "image"
        ) {
          applyCursorState("image");
        } else if (
          isExternal
        ) {
          applyCursorState(
            "external",
            cursorLabel ||
              "VISIT ↗"
          );
        } else if (
          cursorTarget.tagName === "BUTTON"
        ) {
          applyCursorState(
            "button",
            cursorLabel ||
              "OPEN ↗"
          );
        } else {
          applyCursorState(
            "link",
            cursorLabel ||
              "OPEN ↗"
          );
        }
      } else if (
        parallax
      ) {
        applyCursorState("image");
      } else if (
        magnetic
      ) {
        applyCursorState(
          "magnetic",
          magnetic.getAttribute(
            "data-cursor-label"
          ) || "CONTACT ↗"
        );
      } else {
        applyCursorState("normal");
      }
    };

    // ------------------------------------------------------------
    // POINTER LEAVE
    // ------------------------------------------------------------

    const handlePointerLeave = () => {
      if (!mounted) return;

      visible = false;

      stopIdle();

      gsap.to(
        [dot, follower, label],
        {
          opacity: 0,
          scale: 0.72,
          duration: CONFIG.cursorLeaveDuration,
          ease: "power3.out",
          overwrite: true,
        }
      );

      if (currentMagnetic) {
        resetMagnetic(currentMagnetic);
        currentMagnetic = null;
      }

      if (currentParallax) {
        resetParallax(currentParallax);
        currentParallax = null;
      }

      if (currentHoverX) {
        resetHoverX(currentHoverX);
        currentHoverX = null;
      }

      if (currentHoverY) {
        resetHoverY(currentHoverY);
        currentHoverY = null;
      }

      currentTitle = null;
      cursorState = "normal";
      currentLabel = "";
    };

    // ------------------------------------------------------------
    // POINTER ENTER
    // ------------------------------------------------------------

    const handlePointerEnter = () => {
      if (!mounted) return;

      if (!visible) {
        gsap.to(
          [dot, follower],
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          }
        );
      }
    };

    // ------------------------------------------------------------
    // EVENT LISTENERS
    // ------------------------------------------------------------

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter
    );

    // ------------------------------------------------------------
    // CLEANUP
    // ------------------------------------------------------------

    return () => {
      mounted = false;

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );

      if (idleTimer) {
        clearTimeout(idleTimer);
      }

      if (idleTween) {
        idleTween.kill();
      }

      if (labelTimeline) {
        labelTimeline.kill();
      }

      if (velocityTween) {
        velocityTween.kill();
      }

      if (currentMagnetic) {
        gsap.killTweensOf(
          currentMagnetic
        );
      }

      if (currentParallax) {
        const mouseLayer =
          (currentParallax.querySelector(
            ".project-image-mouse-layer"
          ) as HTMLElement | null) ||
          currentParallax;

        gsap.killTweensOf(
          mouseLayer
        );
      }

      if (currentTitle) {
        gsap.killTweensOf(
          currentTitle
        );
      }

      if (currentHoverX) {
        gsap.killTweensOf(
          currentHoverX
        );
      }

      if (currentHoverY) {
        gsap.killTweensOf(
          currentHoverY
        );
      }

      gsap.killTweensOf(dot);
      gsap.killTweensOf(follower);
      gsap.killTweensOf(label);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* --------------------------------------------------------
          CENTER DOT
      --------------------------------------------------------- */}

      <div
        ref={dotRef}
        className="
          custom-cursor-dot
          fixed
          top-0
          left-0
          w-[6px]
          h-[6px]
          rounded-full
          bg-emerald-400
          pointer-events-none
          opacity-0
          z-[100002]
          will-change-transform
        "
      />

      {/* --------------------------------------------------------
          OUTER FOLLOWER
      --------------------------------------------------------- */}

      <div
        ref={followerRef}
        className="
          custom-cursor-follower
          fixed
          top-0
          left-0
          flex
          items-center
          justify-center
          rounded-full
          border
          border-emerald-500/40
          bg-emerald-500/10
          pointer-events-none
          opacity-0
          backdrop-blur-[1px]
          z-[100001]
          will-change-transform
        "
        style={{
          width: 36,
          height: 36,
        }}
      />

      {/* --------------------------------------------------------
          FLOATING LABEL
      --------------------------------------------------------- */}

      <div
        ref={labelRef}
        className="
          custom-cursor-label
          fixed
          top-0
          left-0
          flex
          items-center
          justify-center
          px-3
          py-1
          text-[9px]
          sm:text-[10px]
          font-bold
          tracking-[0.12em]
          text-white
          uppercase
          whitespace-nowrap
          opacity-0
          pointer-events-none
          z-[100003]
          will-change-transform
        "
      />
    </div>
  );
}
