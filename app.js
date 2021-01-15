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
      "state": gops[i][0],
      "last": gops[i][3],
      "linkurl": gops[i][8],
      "imgurl": (gops[i][9] ? gops[i][9] : 'https://via.placeholder.com/150'),
      "text": gops[i][6],
      "date": gops[i][7]
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
  console.log(senators['yea'],senators['nay']);
  // Print out numbers
  document.querySelector('#yeacount').textContent = yeacount;
  document.querySelector('#leanyeacount').textContent = leanyeacount;
  document.querySelector('#leannaycount').textContent = leannaycount;
  document.querySelector('#naycount').textContent = naycount;
  document.querySelector('#unknowncount').textContent = unknowncount;

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
  buildlist(senators['unknown'], '#unknownlist');

  pymChild.sendHeight();
  
}).catch(function (err) {
  console.warn('Something went wrong.', err);
});



