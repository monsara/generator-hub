document.addEventListener('DOMContentLoaded', function() {
  /*
   * Animation scroll
   **/

  // собираем все якоря; устанавливаем время анимации и количество кадров
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    // animationTime = 300,
    animationTime = 7000,
    // framesCount = 20;
    framesCount = 1200;

  anchors.forEach(function(item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', function(e) {
      // убираем стандартное поведение
      e.preventDefault();

      // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
      let coordY =
        document
          .querySelector(item.getAttribute('href'))
          .getBoundingClientRect().top + window.pageYOffset;

      // запускаем интервал, в котором
      let scroller = setInterval(function() {
        // считаем на сколько скроллить за 1 такт
        let scrollBy = coordY / framesCount;

        // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
        // и дно страницы не достигнуто
        if (
          scrollBy > window.pageYOffset - coordY &&
          window.innerHeight + window.pageYOffset < document.body.offsetHeight
        ) {
          // то скроллим на к-во пикселей, которое соответствует одному такту
          window.scrollBy(0, scrollBy);
        } else {
          // иначе добираемся до элемента и выходим из интервала
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }
        // время интервала равняется частному от времени анимации и к-ва кадров
      }, animationTime / framesCount);
    });
  });

  /*
   * Open modal
   **/

  const page = document.querySelector('.page');
  const orderForm = document.querySelector('.order-form');
  const openModalBtns = document.querySelectorAll(
    '.button[data-action="open-modal"]',
  );
  // const formSubmitBtn = document.querySelector(
  //   '.button[data-action="submit-form"]',
  // );

  openModalBtns.forEach(function(item) {
    item.addEventListener('click', handleOpenModal);
  });

  orderForm.addEventListener('submit', handleOrderFormClick);

  function handleOpenModal(evt) {
    evt.preventDefault();

    page.classList.add('show-modal');
    window.addEventListener('keydown', handleModalEscPress);
  }

  function handleOrderFormClick(evt) {
    const target = evt.target;
    const nodeName = target.nodeName;

    if (nodeName !== 'BUTTON') return;

    handleSubmit();
    console.log(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleCloseModal();
    orderForm.reset();
  }

  function handleCloseModal() {
    page.classList.remove('show-modal');
    window.removeEventListener('keydown', handleModalEscPress);
  }

  function handleModalEscPress(evt) {
    const key = evt.code;

    if (key !== 'Escape') return;

    handleCloseModal();
  }

  /*
   * Toggle tab buttons and tab panels
   **/

  const tabs = document.querySelector('.tabs');
  const tabsPanels = tabs.querySelectorAll('.tabs__panel');
  const tabsBtns = tabs.querySelectorAll('.tabs__button');

  tabsBtns.forEach(tabsBtn => {
    tabsBtn.addEventListener('click', handleTabsBtnsClick);
  });

  function handleTabsBtnsClick() {
    toggleButtons.call(this);
    toggleTabs.call(this);
  }

  function toggleButtons() {
    //Remove button_checked class from all buttons
    tabsBtns.forEach(button => button.classList.remove('button_checked'));
    //Add button_checked class to current button
    this.classList.add('button_checked');
  }

  function toggleTabs() {
    //Remove tabs__panel_active class from all tabs
    tabsPanels.forEach(tab => tab.classList.remove('tabs__panel_active'));
    //Find linked tab by date-tab attribute and add tabs__panel_active' class
    tabs
      .querySelector('.' + this.dataset.tab)
      .classList.add('tabs__panel_active');

    this.style.display = 'block';
  }
});