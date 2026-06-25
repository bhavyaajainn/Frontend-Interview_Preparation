import React, { useState } from "react";
import data from "./data.json";
import "./ReactAccordion.css";
const ReactAccordion = () => {
  const arr = new Array(data?.faqs?.length || 0).fill(false);
  const [faqState, setFaqState] = useState(arr);
  console.log("faqState", faqState);
  return (
    <div className="container">
      <div className="faq-container">
        {data?.faqs?.map((item, index) => {
          return (
            <div className="faq">
              <div className="faq-card">
                <div>{item.question}</div>
                <div
                  className="icon"
                  onClick={() => {
                    setFaqState((prev) => {
                      const next = [...prev];

                      if (!next[index]) {
                        next.map((_, i) => {
                          if (i != index) {
                            next[i] = false;
                          } else {
                            next[i] = true;
                          }
                        });
                      } else {
                        next[index] = !next[index];
                      }
                      return next;
                    });
                  }}
                >
                  {faqState?.[index] == false ? "+" : "-"}
                </div>
              </div>

              {faqState?.[index] && <div>{item.answer}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactAccordion;
