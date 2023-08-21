console.log("Projekt powstał w procesie rekrutacyjnym dla agencji adRespect.pl");

// ZMIENNE
const btnRozwin = $('#btn_rozwin');
const galeriaMgla = $('#galeria_mgla');
const sekcjaGaleria = $('#sekcjaGaleria');

// FUNKCJE STARTOWE
// Menu - zwiń menu w wersji mobilnej po kliknięciu w link
const navLinks = $('.nav-link, .dropdown-item');
const listaMobilna = $('#mainMenu');

navLinks.on('click', function (e) {
    if ($(this).hasClass('dropdown-toggle')) {
        return;
    }

    const hrefWartosc = $(this).attr('href');
    e.preventDefault();

    const targetElement = $(hrefWartosc);
    if (targetElement.length > 0) {
        const targetPrzesuniecie = targetElement.offset().top - 72;
        $('html, body').scrollTop(targetPrzesuniecie);
    }

    listaMobilna.removeClass('show');
});

// GALERIA
const grid = $('.grid');
const msnry = new Masonry(grid.get(0), {
    itemSelector: '.grid-item',
    fitWidth: true,
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true
});

// FUNKCJA ROZWIN GALERIE - główne ciało
btnRozwin.on('click', function () {
    let elems = [];
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < 6; i++) {
        let elem = zlapItemElement(i);
        fragment.appendChild(elem);
        elems.push(elem);
    }
    grid.append(fragment);
    msnry.appended(elems);
    schowajRozwin();
});

// FUNKCJA ROZWIŃ GALERIĘ - stwórz <div class="grid-item"></div>
function zlapItemElement(i) {
    let elem = document.createElement('div');
    let numerZdjecia = 10 + i;

    let a = document.createElement('a');
    a.href = '#';
    a.setAttribute('data-bs-toggle', 'modal');
    a.setAttribute('data-bs-target', '#zdjecie-' + numerZdjecia);

    let img = document.createElement('img');
    img.src = 'img/galeria-zdjecie-' + numerZdjecia + '.webp';
    img.alt = 'Zdjecie ' + numerZdjecia;

    img.addEventListener('load', function () {
        msnry.layout();
    });

    elem.className = 'col-12 col-lg-4 grid-item';

    a.appendChild(img);
    elem.appendChild(a);

    return elem;
}

// FUNKCJA ROZWIŃ GALERIĘ - ukryj elementy
function schowajRozwin() {
    galeriaMgla.addClass('ukryte');
    btnRozwin.addClass('ukryte');
}

// LIGHTBOX
function stworzLightbox(i) {
    return `
            <div class="modal" id="zdjecie-${i}" tabindex="-1" aria-labelledby="lightbox_zdjecie" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content bg-half-black">
            <!-- Zdjęcie -->
            <div class="modal-body text-center d-flex justify-content-center align-items-center ">
              <img class="img-fluid" src="img/galeria-zdjecie-${i}.webp" alt="Zdjęcie ${i}"/>
            </div>
            <!-- Nawigacja -->
            <div class="modal-footer d-flex px-5 w-50 modal-nav">
              <div class="d-flex mx-auto">
                <!-- Poprzedni -->
                <button type="button" class="btn btn-lightbox btn-nav ps-5" data-bs-toggle="modal" data-bs-target="#zdjecie-${i === 1 ? 15 : i - 1}">
                  <span class="strzalki material-symbols-outlined">arrow_left_alt</span><span class="visually-hidden">Poprzedni</span>
                </button>
                <!-- Następny -->
                <button type="button" class="btn btn-lightbox btn-nav" data-bs-toggle="modal" data-bs-target="#zdjecie-${i === 15 ? 1 : i + 1}">
                  <span class="strzalki material-symbols-outlined">arrow_right_alt</span><span class="visually-hidden">Następny</span>
                </button>
              </div>
              <!-- Zamknij -->
              <button type="button" class="btn-close btn-close-white fs-5" data-bs-dismiss="modal" aria-label="Zamknij"></button>
            </div>
          </div>
        </div>
      </div>
        `;
}

const lightboxBloczek = document.createElement('div');
for (let i = 1; i <= 15; i++) {
    lightboxBloczek.innerHTML += stworzLightbox(i);
}
$('body').append(lightboxBloczek);

// ANIMACJE ZALEŻNE OD SCROLLA
let bylScrollOferta = true;
let bylScrollOferta_tekst = true;
let bylScrollFirma = true;
let bylScrollRealizacje = true;
let bylScrollKontakt = true;

let ofertaBloczki = $('.bloczki');
let ofertaTekst = $('#s-oferta-tekst');
let sekcjaFirma = $('#s-firma-tekst');
let sekcjaRealizacje = $('#s-realizacje-naglowek');
let sekcjaKontakt = $('#s-kontakt-bloczek');

$(window).on('scroll', function () {
    const wysokoscOkna = $(window).height();

    // Oferta -tekst
    if ($(this).scrollTop() > wysokoscOkna * 0.20) {
        if (bylScrollOferta_tekst) {
            bylScrollOferta_tekst = false;
            ofertaTekst.addClass('tekst-sekcja');
        }
    }
    // Oferta
    if ($(this).scrollTop() > wysokoscOkna * 0.55) {
        if (bylScrollOferta) {
            bylScrollOferta = false;

            ofertaBloczki.each(function (i) {
                const bloczek = $(this);
                setTimeout(function () {
                    bloczek.css({
                        opacity: '1',
                        transform: 'translateY(0px)',
                        animation: 'rozciagnij 1.2s ease'
                    });
                }, 400 * i);
            });
        }
    }
    // Firma
    if ($(this).scrollTop() > wysokoscOkna * 1.1) {
        if (bylScrollFirma) {
            bylScrollFirma = false;
            sekcjaFirma.addClass('tekst-slajder-2');
        }
    }
    // Realizacje
    if ($(this).scrollTop() > wysokoscOkna * 1.7) {
        if (bylScrollRealizacje) {
            bylScrollRealizacje = false;
            sekcjaRealizacje.addClass('tekst-sekcja');
        }
    }
    // Kontakt
    if ($(this).scrollTop() > wysokoscOkna * 4) {
        if (bylScrollKontakt) {
            bylScrollKontakt = false;
            sekcjaKontakt.addClass('tekst-sekcja');
        }
    }
});

