import { useCallback, useEffect, useRef, useState } from 'react'
import Profile from './Profile'
import './css/style.css'
import './react.css'

const sections = [
    { title: 'Resume' },
    { title: 'Wavve + RetroV', description: '6인 팀장으로 React 기반 Wavve 홈과 카테고리별 메인을 개발하고 RetroV를 연결했습니다.', url: 'https://ott-project-phi.vercel.app/' },
    { title: 'Museum Redesign', description: '국립중앙박물관 웹사이트의 공지사항 탭과 메인 배너를 구현하고 화면 크기에 맞춰 레이아웃을 구성했습니다.', url: 'https://dlsghks.github.io/National-Museum-of-Korea/' },
    { title: 'Contact', description: '네 번째 파일철 내용: 연락처 및 마무리 영역입니다.' },
]

const INTRO = -1
const OUTRO = sections.length
const CONTACT = OUTRO - 1
const ANIMATION_TIME = 1000

function SectionLinks({ active, onNavigate, tabs = false }) {
    return sections.map(({ title }, index) => {
        const label = `0${index + 1}. ${tabs ? title.toUpperCase() : title}`
        const button = (
            <button
                key={title}
                type="button"
                className={tabs ? `file-tab${active === index ? ' active-tab' : ''}` : active === index ? 'active' : ''}
                aria-current={active === index ? 'true' : undefined}
                onClick={() => onNavigate(index)}
            >
                {label}
            </button>
        )
        return tabs ? button : <li key={title}>{button}</li>
    })
}

function ContactInformation() {
    return (
        <div className="contact-information">
            <div className="tel">✆ 010.0000.0000</div>
            <div className="e-mail">✉ dlsghks11511@gmail.com</div>
        </div>
    )
}

export default function App() {
    const [step, setStep] = useState(INTRO)
    const [transition, setTransition] = useState(null)
    const timer = useRef(null)

    const moveTo = useCallback((next) => {
        if (timer.current !== null || next === step || next < INTRO || next > OUTRO) return

        const fromOutro = step === OUTRO
        const animation = fromOutro && next === CONTACT ? 'reveal-file4'
            : fromOutro && next === INTRO ? 'returning-home' : null

        if (animation) setTransition(animation)
        else setStep(next)

        timer.current = window.setTimeout(() => {
            setStep(next)
            setTransition(null)
            timer.current = null
        }, animation === 'returning-home' ? 600 : ANIMATION_TIME)
    }, [step])

    useEffect(() => {
        function handleWheel(event) {
            if (!event.deltaY || event.ctrlKey) return

            const card = event.target instanceof Element && event.target.closest('.file-section')
            if (card && card.scrollHeight > card.clientHeight) {
                const canScroll = event.deltaY > 0
                    ? card.scrollTop + card.clientHeight < card.scrollHeight - 1
                    : card.scrollTop > 0
                if (canScroll) return
            }

            moveTo(step + Math.sign(event.deltaY))
        }

        window.addEventListener('wheel', handleWheel, { passive: true })
        return () => window.removeEventListener('wheel', handleWheel)
    }, [moveTo, step])

    useEffect(() => () => window.clearTimeout(timer.current), [])

    const revealingContact = transition === 'reveal-file4'
    const showNavigation = (step >= 0 && step < OUTRO) || revealingContact
    const active = revealingContact ? CONTACT : step

    return (
        <>
            <header id="main-header" className={showNavigation ? 'visible' : ''} inert={!showNavigation}>
                <button type="button" className="logo" onClick={() => moveTo(INTRO)}>DESIGN PORTFOLIO</button>
                <nav aria-label="포트폴리오">
                    <ul><SectionLinks active={active} onNavigate={moveTo} /></ul>
                </nav>
            </header>

            <main id="stage">
                <div
                    id="outro-wrapper"
                    className={step === OUTRO ? ['visible', transition].filter(Boolean).join(' ') : ''}
                    inert={step !== OUTRO || Boolean(transition)}
                >
                    <div className="outro-top">
                        <div className="outro-title">THE END</div>
                        <div className="outro-desc">포트폴리오를 끝까지 확인해주셔서 감사합니다.</div>
                    </div>
                    <div className="outro-bottom">
                        <button className="outro-btn" type="button" onClick={() => moveTo(INTRO)}>처음으로 돌아가기</button>
                        <ContactInformation />
                    </div>
                </div>

                <div id="envelope-wrapper" className={step === INTRO ? '' : 'opened'} inert={step !== INTRO}>
                    <div className="envelope-top">
                        <div className="env-title">Design Portfolio</div>
                        <div className="env-badge">해당 파일은 밀봉되어 있습니다</div>
                    </div>
                    <div className="envelope-bottom">
                        <button className="env-hint" type="button" onClick={() => moveTo(0)}>⬇️ 휠을 내려서 파일철을 열어주세요</button>
                        <ContactInformation />
                    </div>
                </div>

                <div id="tabs-wrapper" className={showNavigation ? 'visible' : ''} inert={!showNavigation}>
                    <SectionLinks active={active} onNavigate={moveTo} tabs />
                </div>

                {sections.map(({ title, description, url }, index) => (
                    <section
                        key={title}
                        id={`file${index + 1}`}
                        className={`file-section ${step === index ? 'active-card' : revealingContact && index === CONTACT ? 'reveal-under' : ''}`}
                        aria-label={title}
                        inert={step !== index}
                    >
                        {index === 0 ? <Profile onProjectDetails={moveTo} /> : (
                            <>
                                <h2>{title}</h2>
                                <p>{description}</p>
                                {url && <a href={url}>사이트 보기 ↗</a>}
                            </>
                        )}
                    </section>
                ))}
            </main>
        </>
    )
}
