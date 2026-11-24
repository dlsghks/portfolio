import User from './images/user.png'
import Location from './images/location.png'
import Mail from './images/mail.png'
import UiUx from './images/UIUX.svg'
import WebIcon from './images/web-icon.svg'
import FrontEnd from './images/FRONT-END.svg'
import BulbIcon from './images/bulb-icon.svg'

export default function Profile() {
    return (
        <div className="profile-layout">
            <div className="profile-left">
                <div className="profile-heading">
                    <span className="section-label">PROFILE</span>
                    <h2 className="my-name">신인환 <span>›</span></h2>
                    <p className="my-desc">WEB DESIGN &amp; FRONT-END</p>
                    <p className="nutshell">
                        사용자가 이해하기 쉬운 화면을 만들고<br />
                        디자인한 결과물을 직접 구현하는 것을 좋아합니다.
                    </p>
                </div>
                <section className="resume-projects" aria-labelledby="resume-projects-title">
                    <div className="section-heading">
                        <h2 id="resume-projects-title">SELECTED PROJECTS</h2>
                        <div></div>
                    </div>
                    <article>
                        <h3><a href="https://ott-project-phi.vercel.app/">Wavve + RetroV</a></h3>
                        <p className="project-role">6인 팀 프로젝트 · 팀장 / 프론트엔드</p>
                        <dl>
                            <dt>직접 구현</dt>
                            <dd>React로 Wavve 홈과 카테고리별 메인을 개발하고 RetroV를 서비스에 통합했습니다.</dd>
                            <dt>팀 작업 통합 및 개선</dt>
                            <dd>팀원별 작업을 통합하고 화면 간 이동을 점검해 피드백을 반영했습니다. 쇼츠 좋아요와 모바일 마이페이지 진입 시 비로그인 사용자에게 로그인 안내가 표시되도록 수정했습니다.</dd>
                        </dl>
                    </article>
                    <article>
                        <h3><a href="https://dlsghks.github.io/National-Museum-of-Korea/">국립중앙박물관 리디자인</a></h3>
                        <p>공지사항 탭과 메인 배너를 구현하고, 화면 크기에 맞춰 레이아웃을 구성했습니다.</p>
                    </article>
                </section>
                <div className="profile-info">
                    <div className="info-item">
                        <img src={User} alt="" />
                        <span>BIRTH</span>
                        <p>1997. 06. 24</p>
                    </div>
                    <div className="info-item">
                        <img src={Location} alt="" />
                        <span>LOCATION</span>
                        <p>경기도 성남시</p>
                    </div>
                    <div className="info-item">
                        <img src={Mail} alt="" />
                        <span>EMAIL</span>
                        <p>이메일 주소</p>
                    </div>
                </div>
            </div>
            <div className="profile-right">
                <section className="about-me">
                    <div className="section-heading">
                        <span>01</span>
                        <h2>ABOUT ME</h2>
                        <div></div>
                    </div>
                    <div className="about-content">
                        <div>
                            <p>
                                게임기획 업무를 경험한 뒤 현재는 웹디자인과
                                프론트엔드를 공부하며 UI/UX부터 웹 구현까지
                                직접 경험하고 있습니다.
                            </p>
                            <p>
                                새로운 것을 배우고 직접 만들어보는 과정을 즐기며
                                디자인과 개발 사이의 연결을 중요하게 생각합니다.
                            </p>
                        </div>
                        <aside className="currently">
                            <strong>CURRENTLY<br />LEARNING</strong>
                            <p>WEB DESIGN</p>
                            <p>FRONT-END</p>
                            <p>UI / UX</p>
                        </aside>
                    </div>
                </section>
                <section className="skill">
                    <div className="section-heading">
                        <span>02</span>
                        <h2>SKILLS</h2>
                        <div></div>
                    </div>
                    <ul className="skill-list">
                        <li>
                            <img src={UiUx} alt="" />
                            <h3>UI / UX DESIGN</h3>
                            <ul className="detail-list">
                                <li>Figma</li>
                                <li>Wireframe</li>
                                <li>Prototype</li>
                                <li>Responsive Design</li>
                            </ul>
                        </li>
                        <li>
                            <img src={WebIcon} alt="" />
                            <h3>WEB PUBLISHING</h3>
                            <ul className="detail-list">
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>Accessibility</li>
                                <li>Web Standards</li>
                            </ul>
                        </li>
                        <li>
                            <img src={FrontEnd} alt="" />
                            <h3>FRONT-END</h3>
                            <ul className="detail-list">
                                <li>JavaScript · React</li>
                                <li>API</li>
                                <li>Git / GitHub</li>
                            </ul>
                        </li>
                        <li>
                            <img src={BulbIcon} alt="" />
                            <h3>PLANNING</h3>
                            <ul className="detail-list">
                                <li>Information Architecture</li>
                                <li>User Flow</li>
                                <li>Problem Solving</li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>
            <section className="experience">
                <div className="section-heading">
                    <span>03</span>
                    <h2>EXPERIENCE</h2>
                    <div></div>
                </div>
                <ul className="experience-list">
                    <li>
                        <p className="experience-date">2026.06 ~ 현재</p>
                        <div>
                            <h3>Web Design &amp; Front-end Study</h3>
                            <p>UI / UX · Publishing · Responsive Web</p>
                        </div>
                    </li>
                    <li>
                        <p className="experience-date">2022.03 ~ 2023.05</p>
                        <div>
                            <h3>NEXON KOREA · Game Planner</h3>
                            <p>System · Content · Event · BM Planning</p>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    )
}
