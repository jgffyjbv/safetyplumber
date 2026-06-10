(function(){
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),mobile=document.getElementById('mobile'),totop=document.getElementById('totop');
  function onScroll(){var y=window.scrollY||0;nav.classList.toggle('scrolled',y>10);totop.classList.toggle('show',y>700);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  function toggle(){var a=mobile.classList.toggle('on');burger.classList.toggle('on',a);burger.setAttribute('aria-expanded',a);document.body.style.overflow=a?'hidden':'';}
  burger.addEventListener('click',toggle);
  mobile.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){if(mobile.classList.contains('on'))toggle();});});
  totop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mobile.classList.contains('on'))toggle();});

  /* ===== Contact form =====
     Posts to FormSubmit.co (free, no account) -> emails leads to FORM_EMAIL.
     The FIRST submission triggers a one-time "Activate Form" email to that
     inbox; click it once and every future lead is delivered automatically.
     On any network error it falls back to opening a prefilled email so the
     form is never a dead end. */
  var FORM_EMAIL = 'safetyplumber@gmail.com';

  var form=document.getElementById('lead'),btn=document.getElementById('cSubmit'),status=document.getElementById('cStatus'),success=document.getElementById('cSuccess');
  function val(id){var el=document.getElementById(id);return el?el.value.trim():'';}
  function showSuccess(msg){var p=success.querySelector('p');if(msg&&p)p.innerHTML=msg;form.style.display='none';success.classList.add('show');try{success.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}}
  function mailtoFallback(){
    var body='Name: '+val('f-name')+'\nPhone: '+val('f-phone')+'\nEmail: '+val('f-email')+
      '\nService needed: '+val('f-service')+'\nProperty type: '+val('f-prop')+
      '\nJob address: '+val('f-addr')+'\n\nMessage:\n'+val('f-msg');
    var subject='Website request — '+(val('f-service')||'Plumbing service')+' ('+val('f-name')+')';
    window.location.href='mailto:'+FORM_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    showSuccess('Your message is ready in your email app — please hit send and we\'ll get right back to you. Prefer to talk? Call <a href="tel:3474089710" style="color:var(--blue);font-weight:700">347-408-9710</a>.');
  }
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(document.getElementById('company').value){showSuccess();return;} // honeypot
      if(!val('f-name')||!val('f-phone')||!val('f-email')){status.textContent='Please add your name, phone and email so we can reach you.';status.classList.add('show');return;}
      status.classList.remove('show');
      var label=btn.innerHTML; btn.disabled=true; btn.textContent='Sending…';
      var payload={
        Name:val('f-name'), Phone:val('f-phone'), Email:val('f-email'),
        'Service needed':val('f-service')||'—', 'Property type':val('f-prop')||'—',
        'Job address':val('f-addr')||'—', Message:val('f-msg')||'—',
        _subject:'New website lead — Verrazano Plumbing ('+val('f-name')+')',
        _replyto:val('f-email'), _template:'table', _captcha:'false'
      };
      fetch('https://formsubmit.co/ajax/'+encodeURIComponent(FORM_EMAIL),{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload)
      }).then(function(r){return r.json().catch(function(){return {};});})
        .then(function(j){if(j&&(j.success===true||j.success==='true')){showSuccess();}else{throw new Error('inactive');}})
        .catch(function(){btn.disabled=false;btn.innerHTML=label;mailtoFallback();});
    });
  }

  /* scroll reveal */
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('show');});}
})();
