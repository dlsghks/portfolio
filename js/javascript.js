let currentStep = -1; // -1: Intro, 0~3: File 1~4, 4: Outro
let isAnimating = false;

const ANIMATION_TIME = 1000;

const envelopeWrapper = document.getElementById('envelope-wrapper');
const header = document.getElementById('main-header');
const outroWrapper = document.getElementById('outro-wrapper');
const tabsWrapper = document.getElementById('tabs-wrapper');

const files = [
    document.getElementById('file1'),
    document.getElementById('file2'),
    document.getElementById('file3'),
    document.getElementById('file4')
];

const fileTabs = document.querySelectorAll('.file-tab');
const navLinks = document.querySelectorAll('header nav ul li a');

function hideAllFiles() {
    files.forEach(file => {
        file.classList.remove('active-card', 'reveal-under');
    });
}

function hideTabs() {
    tabsWrapper.classList.remove('visible');
    fileTabs.forEach(tab => tab.classList.remove('active-tab'));
}

function hideHeader() {
    header.classList.remove('visible');
}

function updateNav(index) {
    const activeIndex = index === -1 ? 0 : Math.min(index, files.length - 1);
    navLinks.forEach((link, idx) => {
        link.classList.toggle('active', idx === activeIndex);
    });
}

function showIntro() {
    outroWrapper.classList.remove('visible', 'reveal-file4', 'returning-home');
    envelopeWrapper.classList.remove('opened');

    hideHeader();
    hideTabs();
    hideAllFiles();
    updateNav(-1);
}

function showFile(index) {
    envelopeWrapper.classList.add('opened');
    outroWrapper.classList.remove('visible', 'reveal-file4', 'returning-home');

    header.classList.add('visible');
    tabsWrapper.classList.add('visible');

    files.forEach((file, idx) => {
        file.classList.toggle('active-card', idx === index);
        file.classList.remove('reveal-under');
    });

    fileTabs.forEach((tab, idx) => {
        tab.classList.toggle('active-tab', idx === index);
    });

    updateNav(index);
}

function showOutro() {
    envelopeWrapper.classList.add('opened');

    hideHeader();
    hideTabs();
    hideAllFiles();

    outroWrapper.classList.remove('returning-home', 'reveal-file4');
    outroWrapper.classList.add('visible');

    updateNav(files.length);
}

/* Outro -> File 4 (위로 휠 올릴 때: 헤더 등장 속도를 150ms로 대폭 단축) */
function revealFile4FromOutro() {
    isAnimating = true;

    const file4 = files[3];

    file4.classList.remove('active-card');
    file4.classList.add('reveal-under');

    outroWrapper.classList.remove('returning-home');
    outroWrapper.classList.add('visible');

    // ★ 시작하자마자 4번 탭을 미리 활성화 상태로 만들어 줍니다 (애니메이션 없음)
    tabsWrapper.classList.add('visible');
    fileTabs.forEach((tab, idx) => {
        tab.classList.toggle('active-tab', idx === 3);
    });
    header.classList.add('visible');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            outroWrapper.classList.add('reveal-file4');
        });
    });

    // 애니메이션이 완전히 끝날 때 최종 상태 정리
    setTimeout(() => {
        currentStep = 3;

        outroWrapper.classList.remove('visible', 'reveal-file4');

        file4.classList.remove('reveal-under');
        file4.classList.add('active-card');

        updateNav(3);

        isAnimating = false;
    }, ANIMATION_TIME);
}

/* Outro -> Intro (처음으로 돌아가기 버튼: 부드러운 페이드아웃 + 수렴 효과) */
function closeOutroToIntro() {
    if (isAnimating) return;

    isAnimating = true;

    // 아웃트로에 수렴/페이드아웃 애니메이션 클래스 추가
    outroWrapper.classList.add('returning-home');

    setTimeout(() => {
        currentStep = -1;

        outroWrapper.classList.remove('visible', 'returning-home');
        envelopeWrapper.classList.remove('opened');

        hideHeader();
        hideTabs();
        hideAllFiles();
        updateNav(-1);

        isAnimating = false;
    }, 600);
}

function moveToStep(stepIndex) {
    if (isAnimating) return;

    if (currentStep === files.length && stepIndex === -1) {
        closeOutroToIntro();
        return;
    }

    currentStep = Math.max(-1, Math.min(stepIndex, files.length));

    if (currentStep === -1) {
        showIntro();
    } else if (currentStep === files.length) {
        showOutro();
    } else {
        showFile(currentStep);
    }

    isAnimating = true;
    setTimeout(() => {
        isAnimating = false;
    }, ANIMATION_TIME);
}

window.addEventListener('wheel', (e) => {
    if (isAnimating) return;

    if (e.deltaY > 0) {
        if (currentStep < files.length) {
            moveToStep(currentStep + 1);
        }
        return;
    }

    if (e.deltaY < 0) {
        if (currentStep === files.length) {
            revealFile4FromOutro();
            return;
        }

        if (currentStep > -1) {
            moveToStep(currentStep - 1);
        }
    }
}, { passive: true });