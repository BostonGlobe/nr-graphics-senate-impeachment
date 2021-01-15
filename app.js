fetch('data.json').then(function (response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}).then(function (data) {

  const gops = data.filter(senator => senator[4] === 'Republican')

  let senators = {}, yaycount = 0, naycount = 0, unknowncount = 0;
  for (let i = 0; i < gops.length; i += 1) {
    let obj = {
      "name": gops[i][1],
      "state": gops[i][0],
      "last": gops[i][3],
      "imgurl": gops[i][8],
      "text": gops[i][6],
      "date": gops[i][7]
    }
    if (gops[i][5] === 'Impeach') {
      if(!senators['yay']){ senators['yay'] = []; }
      senators['yay'].push(obj);
      yaycount++;
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
  console.log(senators['yay'],senators['nay']);
  // Print out numbers
  document.querySelector('#yaycount').textContent = yaycount;
  document.querySelector('#naycount').textContent = naycount;
  document.querySelector('#unknowncount').textContent = unknowncount;

  function buildlist (senators, el) {
    const temp = document.querySelector('#senator-template').innerHTML;
    let template = Handlebars.compile(temp);
    // template expects 'people'
    const senObj = {};
    senObj['people'] = senators;
    console.log(template(senObj));
    document.querySelector(el).innerHTML = template(senObj);
  }

  buildlist(senators['yay'], '#yaylist');
  buildlist(senators['nay'], '#naylist');
  buildlist(senators['unknown'], '#unknownlist');

  pymChild.sendHeight();
  
}).catch(function (err) {
  console.warn('Something went wrong.', err);
});



