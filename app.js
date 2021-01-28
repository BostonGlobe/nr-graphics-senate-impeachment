fetch('data.json').then(function (response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}).then(function (data) {

  const gops = data.filter(senator => senator[4] === 'Republican')

  let senators = {}, yeacount = 0, leanyeacount = 0, leannaycount = 0, naycount = 0, unknowncount = 0;
  for (let i = 0; i < gops.length; i += 1) {
    let obj = {
      "name": gops[i][1],
      "status": gops[i][5],
      "state": gops[i][0],
      "last": gops[i][3],
      "linkurl": gops[i][8],
      "imgurl": (gops[i][9] ? `images/${gops[i][9]}` : 'https://via.placeholder.com/150'),
      "text": gops[i][6],
      "date": gops[i][7],
      "termup": gops[i][13]
    }
    // Convict,Senators to watch,Unknown,Likely acquit,Acquit

    if (gops[i][5] === 'Convict') {
      if(!senators['yea']){ senators['yea'] = []; }
      senators['yea'].push(obj);
      yeacount++;
    } else if (gops[i][5] === 'Senators to watch') {
      if(!senators['leanyea']){ senators['leanyea'] = []; }
      senators['leanyea'].push(obj);
      leanyeacount++;
    } else if (gops[i][5] === 'Likely acquit') {
      if(!senators['leannay']){ senators['leannay'] = []; }
      senators['leannay'].push(obj);
      leannaycount++;
    } else if (gops[i][5] === 'Acquit') {
      if(!senators['nay']){ senators['nay'] = []; }
      senators['nay'].push(obj);
      naycount++;
    } else {
      if(!senators['unknown']){ senators['unknown'] = []; }
      senators['unknown'].push(obj);
      unknowncount++;
    }
  }
  // console.log(senators['yea'],senators['nay']);
  // Print out numbers
  document.querySelector('#yeacount').textContent = yeacount;
  document.querySelector('#leanyeacount').textContent = leanyeacount;
  document.querySelector('#leannaycount').textContent = leannaycount;
  document.querySelector('#naycount').textContent = naycount;
  // document.querySelector('#unknowncount').textContent = unknowncount;

  function buildlist (senators, el) {
    const temp = document.querySelector('#senator-template').innerHTML;
    let template = Handlebars.compile(temp);
    // template expects 'people'
    const senObj = {};
    senObj['people'] = senators;
    // console.log(template(senObj));
    document.querySelector(el).innerHTML = template(senObj);
  }

  buildlist(senators['yea'], '#yealist');
  buildlist(senators['leanyea'], '#leanyealist');
  buildlist(senators['leannay'], '#leannaylist');
  buildlist(senators['nay'], '#naylist');
  // buildlist(senators['unknown'], '#unknownlist');

  var getOffsetTop = function (elem) {
    var location = 0;
    if (elem.offsetParent) {
      while (elem) {
        location += elem.offsetTop;
        elem = elem.offsetParent;
      }
    }
    return location >= 0 ? location : 0;
  };

  // add a event handler for click
  const ibox = document.querySelector('#infobox');
  const graph = document.querySelector('.graphic');
  const headshots = document.querySelectorAll('.senator');
  function showInfobox(el) {

    ibox.querySelector('.info-name').textContent = el.getAttribute('data-name');
    ibox.querySelector('.info-text').textContent = el.getAttribute('data-text');
    ibox.querySelector('.info-state').textContent = el.getAttribute('data-state');
    ibox.querySelector('.info-termup').textContent = el.getAttribute('data-termup');
    if (el.getAttribute('data-updated')) {
      ibox.querySelector('.info-date').textContent = `Updated: ${el.getAttribute('data-updated')}`;
    } else {
      ibox.querySelector('.info-date').textContent = ''
    }

    if (el.getAttribute('data-link')) {
      while(ibox.querySelector('.info-link').firstChild) {
        ibox.querySelector('.info-link').removeChild(ibox.querySelector('.info-link').firstChild)
      }
      const lnk = document.createElement('a');
      lnk.setAttribute('href', el.getAttribute('data-link'));
      lnk.setAttribute('target', '_new');
      lnk.textContent = 'Read more';
      ibox.querySelector('.info-link').append(lnk)
    } else {
      while(ibox.querySelector('.info-link').firstChild) {
        ibox.querySelector('.info-link').removeChild(ibox.querySelector('.info-link').firstChild)
      }
    }
    let iboxtop = getOffsetTop(el) + 60;
    // if iboxtop plus height of ibox is larger than height of page, flip
    if (iboxtop + ibox.offsetHeight > document.querySelector('.graphic').offsetHeight) {
      iboxtop = getOffsetTop(el) - ibox.offsetHeight - 5;
    }
    ibox.style.top = `${iboxtop}px`;
    let iboxleft = el.offsetLeft - 65;
    if (iboxleft < 0) {
      iboxleft = 1;
    }
    if ( iboxleft + 210  > window.innerWidth ) {
      iboxleft = window.innerWidth - 208;
    }
    ibox.style.left = `${iboxleft}px`;
    ibox.style.opacity = 1;
    graph.classList.add('infobox-active');

    pymChild.sendHeight();
  }
  function hideInfobox (ev) {
    ibox.style.opacity = 0;
    graph.classList.remove('infobox-active');
  }

  for (let i = 0; i < headshots.length; i += 1) {
    headshots[i].addEventListener('click', function (ev) {
      ev.stopPropagation();
      showInfobox(ev.target.closest('.senator'));
    });
  }

  // close infobox 
  ibox.querySelector('#close').addEventListener('click', hideInfobox);
  graph.addEventListener('click', function (ev) {
    if (graph.classList.contains('infobox-active')) {
      hideInfobox(ev);
    }
  });

  pymChild.sendHeight();
  
}).catch(function (err) {
  console.warn('Something went wrong.', err);
});



