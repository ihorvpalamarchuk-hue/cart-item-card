// Мінімальна логіка станів картки: лічильник, підтвердження видалення, повернення товару.
document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.cart-item');
  const empty = document.querySelector('.empty');
  const status = document.getElementById('cart-status');
  const qtyOutput = card.querySelector('.quantity__value');
  const totalOutput = card.querySelector('.cart-item__total-value');
  const decrease = card.querySelector('[data-action="decrease"]');
  const increase = card.querySelector('[data-action="increase"]');
  const removeBtn = card.querySelector('.cart-item__remove');
  const footer = card.querySelector('.cart-item__footer');
  const confirm = card.querySelector('.confirm');

  const UNIT_PRICE = 450;
  const MIN = 1;
  const MAX = 10;
  let qty = 1;

  const formatPrice = (value) => `${value.toLocaleString('uk-UA')} ₴`;

  function render() {
    qtyOutput.value = String(qty);
    totalOutput.value = formatPrice(qty * UNIT_PRICE);
    decrease.disabled = qty <= MIN;
    increase.disabled = qty >= MAX;
  }

  function setConfirm(open) {
    card.dataset.state = open ? 'confirm' : 'default';
    confirm.hidden = !open;
    footer.hidden = open;
    removeBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      confirm.querySelector('[data-action="cancel"]').focus();
    } else {
      removeBtn.focus();
    }
  }

  decrease.addEventListener('click', () => {
    qty = Math.max(MIN, qty - 1);
    render();
    if (decrease.disabled) increase.focus();
  });

  increase.addEventListener('click', () => {
    qty = Math.min(MAX, qty + 1);
    render();
    if (increase.disabled) decrease.focus();
  });

  removeBtn.addEventListener('click', () => setConfirm(confirm.hidden));
  confirm.querySelector('[data-action="cancel"]').addEventListener('click', () => setConfirm(false));

  confirm.querySelector('[data-action="confirm"]').addEventListener('click', () => {
    card.hidden = true;
    empty.hidden = false;
    status.textContent = 'Чашку видалено з кошика.';
    empty.querySelector('button').focus();
  });

  empty.querySelector('[data-action="restore"]').addEventListener('click', () => {
    empty.hidden = true;
    card.hidden = false;
    card.dataset.state = 'default';
    confirm.hidden = true;
    footer.hidden = false;
    removeBtn.setAttribute('aria-expanded', 'false');
    status.textContent = 'Чашку повернуто до кошика.';
    removeBtn.focus();
  });

  // Escape закриває підтвердження
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !confirm.hidden) setConfirm(false);
  });

  render();
});
