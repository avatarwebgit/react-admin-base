export const findComponentById = (components, id) => {
  for (let i = 0; i < components.length; i++) {
    const section = components[i];
    if (section.id === id) return { component: section, path: [i] };
    if (section.columns) {
      for (let j = 0; j < section.columns.length; j++) {
        for (let k = 0; k < section.columns[j].length; k++) {
          const component = section.columns[j][k];
          if (component.id === id) {
            return { component, path: [i, j, k] };
          }
        }
      }
    }
  }
  return null;
};

export const generateHtml = (components, config) => {
  const styleToString = (styleObj) => {
    if (!styleObj) return "";
    return Object.entries(styleObj)
      .map(
        ([key, value]) =>
          `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}:${value}`
      )
      .join(";");
  };

  const bodyContent = components
    .map((section) => {
      const colWidth = 100 / section.columns.length;
      const sectionStyle = styleToString(section.style);

      const columnsHtml = section.columns
        .map((column) => {
          const columnContent = column
            .map((comp) => {
              const compStyle = styleToString(comp.style);
              switch (comp.type) {
                case "text":
                  return `<div style="${compStyle}">${comp.content.replace(
                    /\n/g,
                    "<br />"
                  )}</div>`;
                case "button":
                  return `<a href="${comp.link}"><button style="${compStyle}">${comp.content}</button></a>`;
                case "image":
                  return `<img src="${comp.src}" alt="${comp.alt}" style="${compStyle}" />`;
                case "rich-text":
                  return `<div style="${compStyle}">${comp.content}</div>`;
                case "table":
                  const tableStyle = styleToString(comp.style);
                  const cellStyle = styleToString(comp.cellStyle);
                  const headerHtml = `<thead><tr>${comp.header
                    .map((h) => `<th style="${cellStyle}">${h}</th>`)
                    .join("")}</tr></thead>`;
                  const bodyHtml = `<tbody>${comp.rows
                    .map(
                      (row) =>
                        `<tr>${row
                          .map(
                            (cell) => `<td style="${cellStyle}">${cell}</td>`
                          )
                          .join("")}</tr>`
                    )
                    .join("")}</tbody>`;
                  return `<table style="${tableStyle}">${headerHtml}${bodyHtml}</table>`;
                case "slider":
                  const sliderId = `slider-${comp.id}`;
                  const sliderStyle = styleToString(comp.style);
                  const slidesHtml = comp.slides
                    .map(
                      (slide, index) => `
                            <div class="slider-slide" style="opacity: ${
                              index === 0 ? 1 : 0
                            };">
                                <img src="${slide.src}" alt="Slide ${
                        index + 1
                      }" style="width:100%; height:100%; object-fit: cover;" />
                            </div>
                        `
                    )
                    .join("");

                  const controlsHtml =
                    comp.slides.length > 1
                      ? `
                            <div class="slider-arrow prev">&lsaquo;</div>
                            <div class="slider-arrow next">&rsaquo;</div>
                            <div class="slider-dots">
                                ${comp.slides
                                  .map(
                                    (_, index) => `
                                    <span class="slider-dot ${
                                      index === 0 ? "active" : ""
                                    }" data-slide-index="${index}"></span>
                                `
                                  )
                                  .join("")}
                            </div>
                        `
                      : "";

                  return `<div id="${sliderId}" class="slider-container" style="${sliderStyle}" data-autoplay="${comp.autoplay}" data-swap-time="${comp.swapTime}">
                                    ${slidesHtml}
                                    ${controlsHtml}
                                </div>`;
                case "video":
                  return `<iframe src="${comp.src}" style="${compStyle}" frameborder="0" allowfullscreen></iframe>`;
                case "spacer":
                  return `<div style="${compStyle}"></div>`;
                case "divider":
                  return `<hr style="${compStyle}" />`;
                case "icon":
                  return `<i class="${comp.iconClass}" style="${compStyle}"></i>`;
                case "input":
                  return `<input type="${
                    comp.inputType || "text"
                  }" placeholder="${
                    comp.placeholder || ""
                  }" style="${compStyle}" />`;
                case "textarea":
                  return `<textarea placeholder="${
                    comp.placeholder || ""
                  }" style="${compStyle}"></textarea>`;
                case "html":
                  return comp.content;
                case "select":
                  const selectId = `select-${comp.id}`;
                  const optionsHtml = comp.options
                    .map((opt) => `<option value="${opt}">${opt}</option>`)
                    .join("");
                  return `<div style="${styleToString({
                    ...comp.style,
                    padding: "0",
                  })}"><label for="${selectId}" style="display:block; margin-bottom: 5px;">${
                    comp.label
                  }</label><select id="${selectId}" style="width:100%; padding: 5px;">${optionsHtml}</select></div>`;
                default:
                  return "";
              }
            })
            .join("");
          return `<td style="width:${colWidth}%; vertical-align: top; padding: 10px;">${columnContent}</td>`;
        })
        .join("");

      return `<table style="width:100%; border-spacing: 0; ${sectionStyle}"><tbody><tr>${columnsHtml}</tr></tbody></table>`;
    })
    .join("");

  const sliderCss = `
        .slider-container { position: relative; overflow: hidden; background: #333; }
        .slider-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease-in-out; visibility: hidden; }
        .slider-slide[style*="opacity: 1"] { visibility: visible; }
        .slider-arrow { position: absolute; top: 50%; transform: translateY(-50%); font-size: 2rem; color: #fff; z-index: 10; cursor: pointer; background: rgba(0,0,0,0.4); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; user-select: none; }
        .slider-arrow.prev { left: 10px; }
        .slider-arrow.next { right: 10px; }
        .slider-dots { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; z-index: 10; }
        .slider-dot { width: 12px; height: 12px; margin: 0 5px; cursor: pointer; background-color: rgba(255, 255, 255, 0.5); border-radius: 50%; display: inline-block; transition: background-color 0.6s ease; }
        .slider-dot.active { background-color: white; }
    `;

  const sliderScript = `
      <script>
        document.addEventListener('DOMContentLoaded', function() {
            const sliders = document.querySelectorAll('.slider-container');
            sliders.forEach(slider => {
                const slides = Array.from(slider.querySelectorAll('.slider-slide'));
                if (slides.length === 0) return;
                const dots = slider.querySelectorAll('.slider-dot');
                const prevArrow = slider.querySelector('.slider-arrow.prev');
                const nextArrow = slider.querySelector('.slider-arrow.next');
                let currentIndex = 0;
                let autoplayInterval = null;

                const autoplay = slider.dataset.autoplay === 'true';
                const swapTime = parseInt(slider.dataset.swapTime, 10) || 3000;

                function showSlide(index) {
                    if (index >= slides.length || index < 0) return;
                    slides.forEach((slide, i) => {
                        slide.style.opacity = i === index ? 1 : 0;
                    });
                    if (dots.length > 0) {
                        dots.forEach((dot, i) => {
                            dot.classList.toggle('active', i === index);
                        });
                    }
                    currentIndex = index;
                }

                function nextSlide() {
                    const newIndex = (currentIndex + 1) % slides.length;
                    showSlide(newIndex);
                }

                function prevSlide() {
                    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
                    showSlide(newIndex);
                }

                if (nextArrow) nextArrow.addEventListener('click', () => {
                    nextSlide();
                    resetAutoplay();
                });
                if (prevArrow) prevArrow.addEventListener('click', () => {
                    prevSlide();
                    resetAutoplay();
                });

                dots.forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        const index = parseInt(e.target.dataset.slideIndex, 10);
                        showSlide(index);
                        resetAutoplay();
                    });
                });

                function startAutoplay() {
                    if (autoplay && slides.length > 1) {
                        autoplayInterval = setInterval(nextSlide, swapTime);
                    }
                }

                function resetAutoplay() {
                    clearInterval(autoplayInterval);
                    startAutoplay();
                }

                startAutoplay();
                showSlide(0);
            });
        });
      </script>
    `;

  return `
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${config.metaTitle || config.title}</title>
        ${
          config.metaDescription
            ? `<meta name="description" content="${config.metaDescription}">`
            : ""
        }
        ${
          config.metaKeywords.length > 0
            ? `<meta name="keywords" content="${config.metaKeywords.join(
                ", "
              )}">`
            : ""
        }
        <style>
          body { margin: 0; padding: 0; background-color: ${
            config.backgroundColor
          }; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          * { box-sizing: border-box; }
          ${sliderCss}
        </style>
      </head>
      <body>
        ${bodyContent}
        ${sliderScript}
      </body>
      </html>
    `;
};
