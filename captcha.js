document.addEventListener("DOMContentLoaded", function() {
    let firstTouchTime = null;
    let firstTouched = false;
    let urlParams = new URLSearchParams(window.location.search);
    let returnUrl = urlParams.get("return") || "index.html";
    let key = urlParams.get("key") || "";

    let pointA = document.getElementById("pointA");
    let pointB = document.getElementById("pointB");
    let statusText = document.getElementById("status");

    if (!pointA || !pointB || !statusText) {
        console.error("Elemen CAPTCHA tidak ditemukan!");
        return;
    }

    pointA.addEventListener("click", function() {
        if (!firstTouched) {
            firstTouched = true;
            firstTouchTime = new Date().getTime();
            statusText.innerText = "Titik A tersentuh, sekarang sentuh titik B!";
        }
    });

    pointB.addEventListener("click", function() {
        if (firstTouched) {
            let timeDifference = new Date().getTime() - firstTouchTime;
            if (timeDifference >= 700 && timeDifference <= 1300) {
                statusText.innerText = "✅ CAPTCHA berhasil! Memverifikasi...";
                
                fetch(`api.php?key=${encodeURIComponent(key)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Tutup modal & kirim hasil ke halaman utama
                            document.getElementById("captchaModal").style.display = "none";
                            window.parent.postMessage("captcha_success", "*");
                        } else {
                            alert("❌ Kode unik tidak valid!");
                        }
                    })
                    .catch(error => {
                        console.error("Kesalahan API:", error);
                        alert("❌ Terjadi kesalahan saat verifikasi!");
                    });
            } else {
                statusText.innerText = "❌ Gagal! Waktu tidak sesuai.";
                firstTouched = false;
            }
        }
    });
});
