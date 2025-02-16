document.addEventListener('DOMContentLoaded', function() {
    // 移除开场动画
    setTimeout(() => {
        document.querySelector('.welcome-screen').style.display = 'none';
    }, 3000);

    // 初始化照片轮播
    const swiper = new Swiper('.swiper-container', {
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 倒计时功能
    function updateCountdown() {
        const weddingDate = new Date('2025-03-12 12:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = 
            days + '天 ' + hours + '小时 ' + minutes + '分钟 ' + seconds + '秒';
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 音乐播放控制
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('img');
    let isPlaying = false;

    // 处理微信自动播放
    function autoPlayMusic() {
        // 微信自动播放解决方案
        document.addEventListener("WeixinJSBridgeReady", function () {
            bgMusic.play();
            isPlaying = true;
        }, false);
        
        // 其他浏览器自动播放
        document.addEventListener('click', function initAudio() {
            if (!isPlaying) {
                bgMusic.play();
                isPlaying = true;
            }
            document.removeEventListener('click', initAudio);
        }, { once: true });
    }

    // 尝试自动播放
    autoPlayMusic();

    // 音乐开关控制
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.classList.add('paused');
        } else {
            bgMusic.play();
            musicIcon.classList.remove('paused');
        }
        isPlaying = !isPlaying;
    });

    // 处理页面可见性变化
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            bgMusic.pause();
            musicIcon.classList.add('paused');
        } else {
            if (isPlaying) {
                bgMusic.play();
                musicIcon.classList.remove('paused');
            }
        }
    });

    // 祝福墙功能
    const wishInput = document.getElementById('wishInput');
    const sendWishBtn = document.getElementById('sendWish');
    const wishesContainer = document.getElementById('wishesContainer');

    sendWishBtn.addEventListener('click', function() {
        const wishText = wishInput.value.trim();
        if (wishText) {
            addWish(wishText);
            wishInput.value = '';
        }
    });

    function addWish(text) {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        wishElement.innerHTML = `
            <p>${text}</p>
            <small>${new Date().toLocaleString()}</small>
        `;
        wishesContainer.insertBefore(wishElement, wishesContainer.firstChild);
    }

    // RSVP表单处理
    const rsvpForm = document.getElementById('rsvpForm');
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(rsvpForm);
        // 这里可以添加表单提交逻辑
        alert('感谢您的回复！');
        rsvpForm.reset();
    });

    // 导航功能
    const navigateBtn = document.querySelector('.navigate-btn');
    navigateBtn.addEventListener('click', function() {
        // 这里可以添加导航链接
        const address = '婚礼地点详细地址';
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
            // 微信内置地图
            window.location.href = `weixin://map/marker?lat=纬度&lng=经度&name=${encodeURIComponent(address)}`;
        } else {
            // 百度地图
            window.location.href = `https://api.map.baidu.com/marker?location=纬度,经度&title=${encodeURIComponent(address)}&content=${encodeURIComponent(address)}&output=html`;
        }
    });

    // 页面滚动动画
    const animateElements = document.querySelectorAll('.animate__animated');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
            }
        });
    });

    animateElements.forEach(element => {
        element.style.visibility = 'hidden';
        observer.observe(element);
    });
}); 