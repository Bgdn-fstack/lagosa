document.addEventListener('DOMContentLoaded', () => {
    // 1. Кэшируем элементы один раз при загрузке (оптимизация производительности)
    const logoLink = document.getElementById('logo-link');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.navbar');

    // 2. Плавный скролл наверх по клику на логотип + мгновенный сброс меню
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();

            // Сразу гасим все активные пункты меню, не дожидаясь окончания скролла
            navLinks.forEach(link => link.classList.remove('active'));

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Отслеживание скролла (Sticky-эффект + Сброс на самом верху)
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Логика липкой шапки
        if (scrollPosition > 120) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }

        // ЖЕСТКИЙ СБРОС ДЛЯ ВЕРХНЕЙ ЗОНЫ
        // Если мы поднялись к самому верху (меньше 120px до потолка), 
        // гарантированно отключаем подсветку у всех пунктов
        if (scrollPosition < 120) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    });

    // 4. Intersection Observer для переключения секций при скролле
    const observerOptions = {
        root: null,
        // Срабатывает, когда секция пересекает центр экрана
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        // Если мы у самого верха, игнорируем срабатывание обсервера, чтобы не было мигания
        if (window.scrollY < 120) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Снимаем класс active со всех ссылок
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Находим нужную ссылку и добавляем класс active
                const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    
                    // Плавный горизонтальный скролл самого меню (актуально для мобильных)
                    activeLink.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }
        });
    }, observerOptions);

    // Вешаем наблюдатель на все секции
    sections.forEach(section => {
        observer.observe(section);
    });
});


function playVideo() {
    const video = document.getElementById('mainVideo');
    const container = document.getElementById('videoContainer');
    container.classList.add('is-playing');
    video.play();
}