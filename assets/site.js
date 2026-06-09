(function(){
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),mobile=document.getElementById('mobile'),totop=document.getElementById('totop');
  function onScroll(){var y=window.scrollY||0;nav.classList.toggle('scrolled',y>10);totop.classList.toggle('show',y>700);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  function toggle(){var a=mobile.classList.toggle('on');burger.classList.toggle('on',a);burger.setAttribute('aria-expanded',a);document.body.style.overflow=a?'hidden':'';}
  burger.addEventListener('click',toggle);
  mobile.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){if(mobile.classList.contains('on'))toggle();});});
  totop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mobile.classList.contains('on'))toggle();});

  /* Contact form -> opens a pre-filled email to the office.
     (Static site, no backend. To collect submissions automatically later,
      swap this for a Forminit/Formspree endpoint like the other BH sites.) */
  var form=document.getElementById('lead'),btn=document.getElementById('cSubmit'),status=document.getElementById('cStatus'),success=document.getElementById('cSuccess');
  function val(id){var el=document.getElementById(id);return el?el.value.trim():'';}
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(document.getElementById('company').value){success.classList.add('show');form.style.display='none';return;} // honeypot
      if(!val('f-name')||!val('f-phone')||!val('f-email')){status.textContent='Please add your name, phone and email so we can reach you.';status.classList.add('show');return;}
      status.classList.remove('show');
      var body=
        'Name: '+val('f-name')+'\n'+
        'Phone: '+val('f-phone')+'\n'+
        'Email: '+val('f-email')+'\n'+
        'Service needed: '+val('f-service')+'\n'+
        'Property type: '+val('f-prop')+'\n'+
        'Job address: '+val('f-addr')+'\n\n'+
        'Message:\n'+val('f-msg');
      var subject='Website request — '+(val('f-service')||'Plumbing service')+' ('+val('f-name')+')';
      window.location.href='mailto:safetyplumber@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      form.style.display='none';success.classList.add('show');
    });
  }

  /* scroll reveal */
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('show');});}
})();
