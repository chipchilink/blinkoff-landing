const binded = (...map) => {
  const list = document.querySelector('.descr-list');
  map.forEach(([pointId, itemIds]) => {
    const items = itemIds.map((itemId) => document.getElementById(itemId));
    const point = document.getElementById(pointId);

    const itemsActivates = () => {
      point.classList.add('-active');
      items.forEach((item) => {
        item.classList.add('-active');
      });
      list.classList.add('-active');
    };

    const itemsDeactivates = () => {
      point.classList.remove('-active');
      items.forEach((item) => {
        item.classList.remove('-active');
      });
      list.classList.remove('-active');
    }

    point.addEventListener('mouseenter', itemsActivates);

    point.addEventListener('mouseleave', itemsDeactivates);

    items.forEach((item) => {
      item.addEventListener('mouseenter', itemsActivates);
      item.addEventListener('mouseleave', itemsDeactivates);
    });
  });
};

binded(
  ['descr3-point-1', ['p1']],
  ['descr3-point-2', ['p2p5']],
  ['descr3-point-3', ['p3-1', 'p3-2', 'p3-3']],
  ['descr3-point-4', ['p4-1', 'p4-2']],
  ['descr3-point-5', ['p2p5']],
);
