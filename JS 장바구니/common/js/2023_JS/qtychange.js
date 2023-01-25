// 수량값 id (cnt2)
// 수량 변동 버튼 class (plus, minus)

function changeQty(type) {
  const qty = document.getElementById("cnt2");
  let tmpQty = parseInt(qty);

  if (type === "plus") {
    tmpQty = tmpQty + 1;
  } else if (type === "minus") {
    tmpQty = tmpQty - 1;
  }

  qty.innerText = tmpQty;
}
