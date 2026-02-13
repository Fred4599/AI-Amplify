"use client";

import * as React from "react";
import { CardStack, type CardStackItem } from "./ui/card-stack";

export type CourseItem = {
  title: string;
  tag: string;
  image: string;
  color: string;
};

const MOBILE_BREAKPOINT = 768;
const SMALL_MOBILE = 480;

function useCardDimensions() {
  const [dims, setDims] = React.useState({
    cardWidth: 520,
    cardHeight: 320,
    maxVisible: 7,
    spreadDeg: 48,
    perspectivePx: 1100,
  });

  React.useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (w <= SMALL_MOBILE) {
        setDims({
          cardWidth: 260,
          cardHeight: 160,
          maxVisible: 3,
          spreadDeg: 32,
          perspectivePx: 600,
        });
      } else if (w <= MOBILE_BREAKPOINT) {
        setDims({
          cardWidth: 300,
          cardHeight: 180,
          maxVisible: 5,
          spreadDeg: 40,
          perspectivePx: 700,
        });
      } else {
        setDims({
          cardWidth: 520,
          cardHeight: 320,
          maxVisible: 7,
          spreadDeg: 48,
          perspectivePx: 1100,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

function courseToStackItem(course: CourseItem, index: number): CardStackItem {
  return {
    id: index + 1,
    title: course.title,
    description: undefined,
    imageSrc: course.image,
    tag: course.tag,
    href: "#join",
  };
}

type Props = {
  courses: CourseItem[];
};

export default function CourseCardStack({ courses }: Props) {
  const dims = useCardDimensions();
  const items: CardStackItem[] = React.useMemo(
    () => courses.map((c, i) => courseToStackItem(c, i)),
    [courses],
  );

  return (
    <div className="w-full overflow-hidden px-0 sm:px-2">
      <CardStack
        items={items}
        initialIndex={0}
        maxVisible={dims.maxVisible}
        cardWidth={dims.cardWidth}
        cardHeight={dims.cardHeight}
        spreadDeg={dims.spreadDeg}
        perspectivePx={dims.perspectivePx}
        overlap={0.48}
        depthPx={140}
        tiltXDeg={12}
        activeLiftPx={22}
        activeScale={1.03}
        inactiveScale={0.94}
        loop
        autoAdvance
        intervalMs={2800}
        pauseOnHover
        showDots
        className="w-full"
      />
    </div>
  );
}
