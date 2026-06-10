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
     Submits to Forminit (https://forminit.com) -> emails leads to
     safetyplumber@gmail.com. Paste the Verrazano Forminit form ID below.
     Until an ID is set (or if Forminit is unreachable), it falls back to
     opening a pre-filled email so the form always does something. */
  var FORMINIT_FORM_ID = '';   /* <-- PASTE VERRAZANO FORMINIT FORM ID HERE */

  var form=document.getElementById('lead'),btn=document.getElementById('cSubmit'),status=document.getElementById('cStatus'),success=document.getElementById('cSuccess');
  function val(id){var el=document.getElementById(id);return el?el.value.trim():'';}
  function showSuccess(msg){var p=success.querySelector('p');if(msg&&p)p.innerHTML=msg;form.style.display='none';success.classList.add('show');try{success.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}}
  function mailtoFallback(){
    var body='Name: '+val('f-name')+'\nPhone: '+val('f-phone')+'\nEmail: '+val('f-email')+
      '\nService needed: '+val('f-service')+'\nProperty type: '+val('f-prop')+
      '\nJob address: '+val('f-addr')+'\n\nMessage:\n'+val('f-msg');
    var subject='Website request — '+(val('f-service')||'Plumbing service')+' ('+val('f-name')+')';
    window.location.href='mailto:safetyplumber@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    showSuccess('Your message is ready in your email app — please hit send and we\'ll get right back to you. Prefer to talk? Call <a href="tel:3474089710" style="color:var(--blue);font-weight:700">347-408-9710</a>.');
  }
  if(form){
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      if(document.getElementById('company').value){showSuccess();return;} // honeypot
      if(!val('f-name')||!val('f-phone')||!val('f-email')){status.textContent='Please add your name, phone and email so we can reach you.';status.classList.add('show');return;}
      status.classList.remove('show');

      if(FORMINIT_FORM_ID && typeof Forminit!=='undefined'){
        var label=btn.innerHTML; btn.disabled=true; btn.textContent='Sending…';
        try{
          var fd=new FormData();
          fd.append('fi-sender-fullName',val('f-name'));
          fd.append('fi-sender-email',val('f-email'));
          fd.append('fi-text-phone',val('f-phone'));
          fd.append('fi-text-service',val('f-service'));
          fd.append('fi-text-property',val('f-prop'));
          fd.append('fi-text-address',val('f-addr'));
          fd.append('fi-text-message',val('f-msg'));
          fd.append('fi-text-submitted_at',new Date().toISOString());
          fd.append('fi-text-landing_page',location.href);
          var res=await new Forminit().submit(FORMINIT_FORM_ID,fd);
          if(res&&res.error)throw new Error('failed');
          showSuccess();
        }catch(ex){
          btn.disabled=false; btn.innerHTML=label;
          status.textContent='Something went wrong sending your message. Please call 347-408-9710 or email safetyplumber@gmail.com.';
          status.classList.add('show');
        }
      } else {
        mailtoFallback();   // no Forminit ID set yet -> open prefilled email
      }
    });
  }

  /* scroll reveal */
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('show');});}
})();
