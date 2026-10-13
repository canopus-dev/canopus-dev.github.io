
function ambilKeranjang() {
    return JSON.parse(localStorage.getItem("keranjang")) || [];
}

function simpanKeranjang(keranjang) {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    updateJumlahKeranjang();
}

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function tambahKeranjang(id, nama, harga, gambar) {
    const keranjang = ambilKeranjang();
    const buku = keranjang.find(item => item.id === id);

    if (buku) {
        buku.jumlah += 1;
    } else {
        keranjang.push({ id, nama, harga, gambar, jumlah: 1 });
    }

    simpanKeranjang(keranjang);
    alert(nama + " berhasil ditambahkan ke keranjang!");
}

function beliSekarang(id, nama, harga, gambar) {
    const keranjang = ambilKeranjang();
    const buku = keranjang.find(item => item.id === id);

    if (buku) {
        buku.jumlah += 1;
    } else {
        keranjang.push({ id, nama, harga, gambar, jumlah: 1 });
    }

    simpanKeranjang(keranjang);
    window.location.href = "checkout.html";
}

function hapusDariKeranjang(id) {
    const hasil = ambilKeranjang().filter(item => item.id !== id);
    simpanKeranjang(hasil);
    renderKeranjang();
}

function updateJumlahKeranjang() {
    const jumlah = ambilKeranjang().reduce(
        (total, item) => total + item.jumlah, 0
    );

    const indikator = document.getElementById("jumlah-keranjang");
    if (indikator) indikator.textContent = jumlah;
}

function renderKeranjang() {
    const daftar = document.getElementById("daftar-keranjang");
    if (!daftar) return;

    const keranjang = ambilKeranjang();

    if (keranjang.length === 0) {
        daftar.innerHTML = "<p>Keranjang Anda masih kosong</p>";
        document.getElementById("total-item").textContent = "0 ebook";
        document.getElementById("total-belanja").textContent = "Rp0";
        document.getElementById("tombol-checkout").disabled = true;
        return;
    }

    let total = 0;
    let jumlahItem = 0;

    daftar.innerHTML = keranjang.map(item => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;
        jumlahItem += item.jumlah;

        return `
            <article class="kartu-keranjang">
                <img src="${item.gambar}" alt="${item.nama}">
                <div class="info-buku">
                    <h3>${item.nama}</h3>
                    <p>${formatRupiah(item.harga)} / ebook</p>
                    <p>Jumlah: ${item.jumlah} ebook</p>
                    <strong>Subtotal: ${formatRupiah(subtotal)}</strong>
                    <br>
                    <button class="tombol-hapus"
                        onclick="hapusDariKeranjang('${item.id}')"
                        aria-label="Hapus ${item.nama} dari keranjang">
                        Hapus
                    </button>
                </div>
            </article>
        `;
    }).join("");

    document.getElementById("total-item").textContent =
        jumlahItem + " ebook";
    document.getElementById("total-belanja").textContent =
        formatRupiah(total);
    document.getElementById("tombol-checkout").disabled = false;
}

function lanjutCheckout() {
    if (ambilKeranjang().length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    window.location.href = "checkout.html";
}

function checkout() {
    lanjutCheckout();
}

document.addEventListener("DOMContentLoaded", () => {
    updateJumlahKeranjang();
    renderKeranjang();
});
