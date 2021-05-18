const form = document.querySelector("#form");
const itemName = document.querySelector("#name");
const cost = document.querySelector("#cost");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    name: itemName.value,
    cost: +cost.value,
  };
  if (data.name && data.cost) {
    db.collection("expences")
      .add(data)
      .then((res) => {
        console.log(res);
        itemName.value = "";
        cost.value = "";
      });
  } else {
    console.log("err");
  }
});
