import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback } from 'react';
import { specimens } from '../data/specimens';
import './Hero.css';

function Hero() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const scrollPos = useRef(0);
  const animFrameRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);
  const isHovering = useRef(false);
  const lastTime = useRef(0);
  const hasDragged = useRef(false);

  const items = [...specimens, ...specimens, ...specimens, ...specimens];
  const ITEM_WIDTH = 224; // 200px + 24px gap
  const LOOP_POINT = specimens.length * ITEM_WIDTH;
  const SPEED = 50; // px por segundo

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
    }
  }, []);

  const wrapScroll = useCallback(() => {
    if (scrollPos.current >= LOOP_POINT * 2) {
      scrollPos.current -= LOOP_POINT;
    } else if (scrollPos.current < 0) {
      scrollPos.current += LOOP_POINT;
    }
  }, [LOOP_POINT]);

  useEffect(() => {
    lastTime.current = performance.now();

    const animate = (now) => {
      const dt = (now - lastTime.current) / 1000;
      lastTime.current = now;

      if (!isDragging.current && !isHovering.current) {
        scrollPos.current += SPEED * dt;
        wrapScroll();
        applyTransform();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [applyTransform, wrapScroll]);

  const onMouseDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollStart.current = scrollPos.current;
    containerRef.current?.classList.add('is-dragging');
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 3) hasDragged.current = true;
    scrollPos.current = dragScrollStart.current + delta;
    wrapScroll();
    applyTransform();
  };

  const stopDrag = () => {
    isDragging.current = false;
    containerRef.current?.classList.remove('is-dragging');
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.touches[0].clientX;
    dragScrollStart.current = scrollPos.current;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.touches[0].clientX;
    if (Math.abs(delta) > 3) hasDragged.current = true;
    scrollPos.current = dragScrollStart.current + delta;
    wrapScroll();
    applyTransform();
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const onEnter = () => { isHovering.current = true; };
  const onLeave = () => {
    isHovering.current = false;
    stopDrag();
  };

  const onItemClick = (e) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>ENTOMOLOGÍA</h1>
        <p className="hero-description">
          Descubre la diversidad de insectos de México.
        </p>
        <div
          className="hero-carousel-container"
          ref={containerRef}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="hero-carousel-track" ref={trackRef}>
            {items.map((specimen, index) => (
              <div
                key={`${specimen.id}-${index}`}
                className="hero-carousel-item"
                data-order={specimen.order}
                onClick={onItemClick}
              >
                <div className="carousel-item-content">
                  <span className="specimen-name">{specimen.commonName}</span>
                  <span className="specimen-order">{specimen.order.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-actions">
          <Link to="/library" className="btn-primary">Explorar Fichas Técnicas</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
