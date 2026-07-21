"use client";

import { useState } from "react";
import { experiences, experienceCategories } from "@/data/experiences";

export default function Experiences() {
  const [active, setActive] = useState("all");

  const list =
    active === "all"
      ? experiences
      : experiences.filter((e) => e.category === active);

  return (
    <div>
      <div className="exp-filters">
        <button
          className={"chip" + (active === "all" ? " active" : "")}
          onClick={() => setActive("all")}
        >
          All ({experiences.length})
        </button>
        {experienceCategories.map((c) => {
          const count = experiences.filter((e) => e.category === c.key).length;
          return (
            <button
              key={c.key}
              className={"chip" + (active === c.key ? " active" : "")}
              onClick={() => setActive(c.key)}
            >
              {c.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="exp-list">
        {list.map((e) => (
          <article className="exp" key={e.id}>
            <div className="meta">
              <div>
                <div className="who">
                  {e.author} {e.rating}/5
                </div>
                <div className="role">
                  {e.role} · {e.location}
                </div>
              </div>
            </div>
            <p>{e.body}</p>
            <span className="tag">
              {experienceCategories.find((c) => c.key === e.category)?.label}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
