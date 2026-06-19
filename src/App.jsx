import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const CAN_IMAGE_RATIO = 402 / 1090
const CAN_START_WIDTH = 700
const CAN_START_HEIGHT = 282
const CAN_FALLBACK_WIDTH = 620
const FINAL_CAN_MOBILE_WIDTH = 325
const FINAL_CAN_MIN_WIDTH = 450
const FINAL_CAN_MAX_WIDTH = 620
const FINAL_CAN_VIEWPORT_RATIO = 0.42
const FINAL_CAN_BOTTOM_CLEARANCE = 140

const sections = [
  {
    id: 'shop',
    theme: 'two',
  },
  {
    id: 'about',
    theme: 'three',
  },

]

const productLineup = [
  {
    name: 'Nitro CNG',
    intensity: 'High intensity',
    price: '10.58 $',
    image: '/CanOne.png',
    alt: 'Nitro CNG can',
    className: 'lineup-can lineup-can-small',
  },
  {
    name: 'Nitro Red',
    intensity: 'High intensity',
    price: '11.00 $',
    image: '/CanTwo.png',
    alt: 'Nitro Red can',
    className: 'lineup-can lineup-can-medium',
  },
  {
    name: 'Nitro Green',
    intensity: 'High intensity',
    price: '12.00 $',
    image: '/Can.png',
    alt: 'Nitro Green can',
    className: 'lineup-can lineup-can-featured',
    featured: true,
  },
  {
    name: 'Nitro Sky',
    intensity: 'High intensity',
    price: '11.00 $',
    image: '/CanFour.png',
    alt: 'Nitro Sky can',
    className: 'lineup-can lineup-can-medium',
  },
  {
    name: 'Nitro Blue',
    intensity: 'High intensity',
    price: '10.58 $',
    image: '/CanFive.png',
    alt: 'Nitro Blue can',
    className: 'lineup-can lineup-can-small',
  },
]

const getFeaturedCanWidth = () => {
  if (window.innerWidth <= 768) return FINAL_CAN_MOBILE_WIDTH

  return Math.min(
    FINAL_CAN_MAX_WIDTH,
    Math.max(FINAL_CAN_MIN_WIDTH, window.innerWidth * FINAL_CAN_VIEWPORT_RATIO),
  )
}

function App() {
  const pageRef = useRef(null)
  const canRef = useRef(null)
  const nitroRef = useRef(null)
  const lineupTargetRef = useRef(null)

  useEffect(() => {
    const getStartPosition = () => {
      if (!nitroRef.current || !canRef.current) return
      const rect = nitroRef.current.getBoundingClientRect()
      return {
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2,
      }
    }

    const getFinalCanState = () => {
      if (!lineupTargetRef.current) {
        return {
          left: window.innerWidth / 2,
          top: window.innerHeight / 2,
          width: CAN_FALLBACK_WIDTH,
          height: CAN_FALLBACK_WIDTH * CAN_IMAGE_RATIO,
        }
      }

      const rect = lineupTargetRef.current.getBoundingClientRect()
      const maxScroll = ScrollTrigger.maxScroll(window)
      const finalWidth = getFeaturedCanWidth()
      const targetDocumentBottom = rect.bottom + window.scrollY
      const targetViewportBottom = Math.min(
        targetDocumentBottom - maxScroll,
        window.innerHeight - FINAL_CAN_BOTTOM_CLEARANCE + finalWidth / 2,
      )
      const targetViewportCenter = (
        targetViewportBottom - finalWidth / 2
      )

      return {
        left: rect.left + rect.width / 2,
        top: targetViewportCenter,
        width: finalWidth,
        height: finalWidth * CAN_IMAGE_RATIO,
      }
    }

    const updateCanPosition = () => {
      const start = getStartPosition()
      if (!start || !canRef.current) return
      gsap.set(canRef.current, {
        left: start.left,
        top: start.top,
        xPercent: -50,
        yPercent: -50,
      })
    }

    const refreshScroll = () => {
      updateCanPosition()
      ScrollTrigger.refresh()
    }

    const ctx = gsap.context(() => {
      gsap.set(canRef.current, {
        rotation: 0,
        scale: 0.95,
        opacity: 1,
        width: `${CAN_START_WIDTH}px`,
        height: `${CAN_START_HEIGHT}px`,
        transformOrigin: 'center center',
      })

      updateCanPosition()
      window.addEventListener('resize', refreshScroll)
      window.addEventListener('load', refreshScroll)

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: () => `+=${document.documentElement.scrollHeight - window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .to(canRef.current, {
          scale: 1.55,
          opacity: 0.72,
          ease: 'none',
        }, 0.08)
        .to(canRef.current, {
          left: () => getFinalCanState().left,
          top: () => getFinalCanState().top,
          rotation: -90,
          scale: 1.15,
          opacity: 0.92,
          width: () => getFinalCanState().width,
          height: () => getFinalCanState().height,
          ease: 'none',
        }, 0.18)
    }, pageRef)

    return () => {
      window.removeEventListener('resize', refreshScroll)
      window.removeEventListener('load', refreshScroll)
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div ref={pageRef} className="bg-[#050507] text-white">
      <header className="fixed inset-x-0 top-0 z-40 bg-[#050507]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="nav-logo">Nitro</div>
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.16em] text-white/80 md:flex">
            <a href="#home" className="transition hover:text-white">Home</a>
            <a href="#shop" className="transition hover:text-white">Shop</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#gallery" className="transition hover:text-white">Gallery</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
          <button className="inline-flex h-10 items-center justify-center bg-[#d8ff00] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#050507] shadow-lg shadow-[#d8ff0030] transition hover:brightness-95">
            Buy Now
          </button>
        </div>
      </header>

      <main className="pt-[88px]">
        <section id="home" className="min-h-screen flex items-center section-one">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-start overflow-hidden px-6">
            <span ref={nitroRef} className="nitro-title">Nitro</span>

            <div className="mt-16 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-12">
              <p className="w-full xl:w-1/3 text-sm uppercase tracking-[0.12em] text-white/75 sm:text-base">
                WOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NUNC VULPUTATE LIBERO ET VELIT INTERDUM, AC.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button className="inline-flex h-14 min-w-[165px] items-center justify-center bg-white px-8 text-sm font-semibold uppercase tracking-[0.1em] text-[#050507] transition hover:brightness-95">
                  Buy Now
                </button>
                <button className="inline-flex h-14 min-w-[165px] items-center justify-center border border-white/15 bg-white/5 px-8 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-white/10 hover:text-[#050507]">
                  More info
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a href="#" className="grid h-11 w-11 place-items-center rounded-full border border-[#E0E600] bg-transparent text-[#E0E600] text-sm uppercase transition hover:bg-[#E0E600] hover:text-[#050507]">
                  F
                </a>
                <a href="#" className="grid h-11 w-11 place-items-center rounded-full border border-[#E0E600] bg-transparent text-[#E0E600] text-sm uppercase transition hover:bg-[#E0E600] hover:text-[#050507]">
                  I
                </a>
                <a href="#" className="grid h-11 w-11 place-items-center rounded-full border border-[#E0E600] bg-transparent text-[#E0E600] text-sm uppercase transition hover:bg-[#E0E600] hover:text-[#050507]">
                  X
                </a>
                <a href="#" className="grid h-11 w-11 place-items-center rounded-full border border-[#E0E600] bg-transparent text-[#E0E600] text-sm uppercase transition hover:bg-[#E0E600] hover:text-[#050507]">
                  in
                </a>
              </div>
            </div>
          </div>
        </section>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`min-h-screen flex items-center justify-start px-[8vw] py-[120px] relative ${section.theme === 'two' ? 'section-two' : 'section-three'}`}>
            {section.id === 'shop' ? (
              <div className="w-full flex flex-col items-center gap-8 md:flex-row md:items-stretch">
                <div className="md:w-1/2">
                  <img src="/secondSection.png" alt="Second section" className="second-section-img" />
                </div>
                <div className="md:w-1/2 flex items-center">
                  <div className="second-text mx-auto text-center md:text-left">
                    <div className="sakana-text sakana-since">Since</div>
                    <div className="sakana-text sakana-year font-bold">2002</div>
                    <div className="sakana-text sakana-producing-line1">prod</div>
                    <div className="sakana-text sakana-producing-line2">ucing.</div>
                  </div>
                </div>
              </div>
            ) : section.id === 'about' ? (
              <div className="lineup-section">
                <div className="lineup-stage">
                  {productLineup.map((product) => (
                    <article
                      key={product.name}
                      className={`lineup-product${product.featured ? ' lineup-product-featured' : ''}`}
                    >
                      <div
                        ref={product.featured ? lineupTargetRef : null}
                        className="lineup-image-wrap"
                      >
                        {!product.featured && (
                          <img src={product.image} alt={product.alt} className={product.className} />
                        )}
                      </div>
                      <div className="lineup-copy">
                        <h2>{product.name}</h2>
                        <p>{product.intensity}</p>
                        <strong>{product.price}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl space-y-6 text-white">
                <span className="inline-block text-[0.85rem] uppercase tracking-[0.28em] font-extrabold text-[#d8ff00]">
                  {section.label}
                </span>
                <h1 className="text-[clamp(4rem,6vw,6.5rem)] leading-[0.92] tracking-[-0.08em]">
                  {section.title}
                </h1>
                <p className="max-w-2xl text-[1.1rem] leading-8 text-[#d7d7dd]">
                  {section.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button className="rounded-full bg-[#d8ff00] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#050507]">
                    View product
                  </button>
                  <button className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white">
                    More info
                  </button>
                </div>
              </div>
            )}
          </section>
        ))}
      </main>

      <div
        ref={canRef}
        className="scrolling-can fixed z-[35] overflow-visible">
        <img src="/Can.png" alt="Nitro can" className="scrolling-can-image block h-full w-full object-contain" />
      </div>
    </div>
  )
}

export default App
