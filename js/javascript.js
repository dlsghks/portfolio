let currentStep = -1; // -1: 봉투 닫힘, 0~3: 카드 빠져나간 단계, 4: 마지막 THE END 화면
        let isAnimating = false;

        const envelopeWrapper = document.getElementById('envelope-wrapper');
        const header = document.getElementById('main-header');
        const outroWrapper = document.getElementById('outro-wrapper');
        const files = [
            document.getElementById('file1'),
            document.getElementById('file2'),
            document.getElementById('file3'),
            document.getElementById('file4')
        ];
        const navLinks = document.querySelectorAll('header nav ul li a');

        function updateState() {
            isAnimating = true;

            if (currentStep === -1) {
                envelopeWrapper.classList.remove('opened');
                header.classList.remove('visible');
                outroWrapper.classList.remove('visible');
                files.forEach(f => f.classList.remove('in-place', 'pulled-out'));
            } else {
                envelopeWrapper.classList.add('opened');
                header.classList.add('visible');

                if (currentStep === files.length) {
                    outroWrapper.classList.add('visible');
                } else {
                    outroWrapper.classList.remove('visible');
                }

                // 현재 스텝(currentStep)보다 앞에 있는 카드들은 아래로 쏙 빠져나가고(pulled-out),
                // 현재 스텝과 같거나 뒤에 있는 카드들은 제자리에 쌓여있음(in-place)
                files.forEach((file, idx) => {
                    file.classList.add('in-place');
                    if (idx < currentStep) {
                        file.classList.add('pulled-out');
                    } else {
                        file.classList.remove('pulled-out');
                    }
                });
            }

            let activeNavIndex = currentStep === -1 ? 0 : Math.min(currentStep, files.length - 1);
            navLinks.forEach((link, idx) => {
                if (idx === activeNavIndex) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            setTimeout(() => {
                isAnimating = false;
            }, 1000);
        }

        function moveToStep(stepIndex) {
            if (isAnimating) return;
            currentStep = stepIndex;
            updateState();
        }

        window.addEventListener('wheel', (e) => {
            if (isAnimating) return;

            if (e.deltaY > 0) {
                if (currentStep < files.length) {
                    currentStep++;
                    updateState();
                }
            } else if (e.deltaY < 0) {
                if (currentStep > -1) {
                    currentStep--;
                    updateState();
                }
            }
        }, { passive: true });