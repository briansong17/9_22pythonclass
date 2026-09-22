'use strict';
// 교범 데이터: 숫자 밸런스보다 관찰과 판단의 순서를 설명합니다.
const guides = {
  ling: {name:'저글링 포위 대응', threat:'빠른 저글링 다수가 측면과 퇴로를 감싸면 해병이 사격할 거리와 시간을 잃습니다.', signs:'정면의 소수 저글링만 보지 말고 측면의 빈 공간, 점막 경계와 미니맵의 이동을 함께 살피세요.', steps:['교전 전에 퇴로와 저글링의 우회 경로를 확인합니다.','지형을 이용해 한꺼번에 접촉하는 적의 수를 줄입니다. 단, 막다른 곳에는 들어가지 않습니다.','포위되기 전에 거리를 벌리고 아군 지원 범위로 이동합니다.'], avoid:'개활지에 고립되기, 퇴로 없이 추격하기, 이미 포위된 뒤에야 후퇴를 시작하기.', rule:'퇴로 없는 자신감은 저그의 도시락 포장지다.', relevant:['퇴로 미확보','정찰 부족','무리한 추격']},
  bane: {name:'맹독충 접근 대응', threat:'맹독충의 자폭 범위 공격은 밀집한 해병에게 특히 위험합니다. 저글링이 길을 막는 상황도 함께 경계하세요.', signs:'초록색 구체의 진입 방향과 측면 접근을 확인하세요. 점막 위에서는 대응할 여유가 더 짧아질 수 있습니다.', steps:['맹독충을 확인하면 충돌 전에 병력을 나누고 서로 겹치지 않게 배치합니다.','충돌이 임박한 맹독충을 상황에 맞게 우선 공격하되, 전 병력이 한 대상에 몰려 이동하지 않게 합니다.','후퇴 중에도 병력 간 간격과 퇴로를 확인하고 지원 병력의 사격 범위로 유도합니다.'], avoid:'좁은 길에서 뭉치기, 한 지점으로 일제히 후퇴하기, 맹독충을 쫓아 점막 깊숙이 들어가기.', rule:'초록 공이 굴러오면 단체사진 촬영은 취소다.', relevant:['병력 밀집','퇴로 미확보','정찰 부족','무리한 추격']},
  roach: {name:'바퀴·히드라 혼합 병력 대응', threat:'바퀴가 전방에서 버티고 히드라리스크가 뒤에서 화력을 더합니다. 해병만으로 정면 돌파할 수 있다고 가정하지 마세요.', signs:'앞줄의 바퀴뿐 아니라 뒤쪽 히드라리스크의 규모, 적 증원 방향과 자신의 지원 병력 위치를 확인하세요.', steps:['적 구성과 아군 화력 지원을 확인하고 교전 여부를 판단합니다.','유리한 지형과 지원 병력의 사격 범위에서 맞섭니다. 적 후열을 노리느라 무리하게 전진하지 않습니다.','밀리면 퇴로가 열려 있을 때 병력을 보존하고 지원과 합류합니다.'], avoid:'해병만으로 수와 구성이 불리한 정면 교전을 강행하기, 적 후열을 쫓으며 아군 지원에서 이탈하기.', rule:'용기는 기본 장비다. 무적 기능은 별도 판매도 안 한다.', relevant:['정찰 부족','퇴로 미확보','무리한 추격']},
  muta: {name:'뮤탈리스크 기습 대응', threat:'뮤탈리스크는 비행 기동성으로 방어가 빈 곳을 찌르고 빠질 수 있습니다. 반복 견제에 병력이 끌려다니기 쉽습니다.', signs:'미니맵 가장자리와 시야 밖 진입 경로를 살피고, 공격 후 빠진 방향도 기억하세요.', steps:['진입 경로와 지켜야 할 위치를 먼저 확인합니다.','대공 방어와 서로 지원할 수 있는 곳에 해병을 배치합니다.','격퇴 후에는 깊게 추격하지 말고 다음 진입과 다른 구역의 노출을 확인합니다.'], avoid:'날아가는 적을 지상 병력으로 끝까지 추격하기, 한 번의 기습에 모든 방어 병력을 몰아주기.', rule:'날개 달린 적과 술래잡기를 하면 출퇴근은 우리만 한다.', relevant:['정찰 부족','무리한 추격','병력 밀집']},
  lurker: {name:'잠복 가시지옥 대응', threat:'잠복한 가시지옥은 직선 범위 공격으로 겹쳐 선 병력을 타격합니다. 탐지와 공격 위치 확인이 중요합니다.', signs:'지면에서 뻗는 가시의 방향과 적이 유도하는 좁은 진입로를 관찰하세요. 보이지 않는다고 안전한 것은 아닙니다.', steps:['탐지 수단과 아군 지원을 확보한 뒤 적 위치를 확인합니다.','공격선에 병력이 길게 겹치지 않도록 간격과 접근 방향을 조절합니다.','탐지를 유지하면서 지원 화력과 함께 대응합니다. 탐지가 끊기면 무리하게 진입하지 않습니다.'], avoid:'탐지 없이 돌진하기, 좁은 길을 일렬로 진격하기, 적 위치를 찾겠다고 해병부터 보내기.', rule:'바닥이 수상하면 발로 확인하지 말자. 발은 소모품이 아니다.', relevant:['탐지 부재','병력 밀집','정찰 부족','퇴로 미확보']}
};
const focusNames = {threat:'위협 파악',response:'대응 순서',avoid:'피해야 할 행동'};
const weaknessTips = {'병력 밀집':'병력 사이의 간격과 범위 공격에 겹치는 위치를 점검하세요.','퇴로 미확보':'교전 전에 빠져나갈 길을 한 곳 이상 확인하세요.','정찰 부족':'보이는 적뿐 아니라 측면과 증원 경로도 확인하세요.','무리한 추격':'추격 전에 시야와 지원 범위가 유지되는지 확인하세요.','탐지 부재':'잠복 위협에는 탐지 수단의 위치와 사용 가능 여부를 확인하세요.'};
const $ = id => document.getElementById(id);
const form = $('bookmark-form');
const KEY = 'terran-zerg-bookmarks-v1';
let records = [], editingId = null;
const fmt = value => value.toLocaleString('ko-KR');
// 사용자 입력은 HTML 문자열에 넣지 않고 textContent로 출력합니다.
function element(tag, text, className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
Object.entries(guides).forEach(([key,guide])=>{const option=element('option',guide.name);option.value=key;$('guide').append(option);});
Object.keys(weaknessTips).forEach((name,index)=>{const label=element('label');const input=document.createElement('input');input.type='checkbox';input.name='weakness';input.value=name;input.id=`weak-${index}`;label.htmlFor=input.id;label.append(input,document.createTextNode(name));$('weaknesses').append(label);});
function state(){return {title:$('title').value.trim(),guide:$('guide').value,focus:form.querySelector('[name="focus"]:checked').value,weaknesses:[...form.querySelectorAll('[name="weakness"]:checked')].map(input=>input.value),goal:Number($('goal').value),memo:$('memo').value.trim()};}
function validGoal(value){return Number.isInteger(value)&&value>=1&&value<=10;}
function renderManual(data){
  const box=$('manual-content');box.replaceChildren();const guide=guides[data.guide];
  if(!guide){box.append(element('p','위에서 저그 위협을 선택하면 대응 교범이 펼쳐집니다.','empty'));return;}
  box.append(element('h3',guide.name));
  [['threat','적의 위협',guide.threat],['signs','관찰할 징후',guide.signs],['response','권장 대응 순서',guide.steps],['avoid','피해야 할 행동',guide.avoid]].forEach(([key,title,body])=>{
    const section=element('div',undefined,'manual-block'+(data.focus===key?' selected':''));section.id=`section-${key}`;section.tabIndex=-1;section.append(element('h4',title));
    if(Array.isArray(body)){const list=element('ol');body.forEach(text=>list.append(element('li',text)));section.append(list);}else section.append(element('p',body));box.append(section);
  });box.append(element('p',guide.rule,'survival'));
}
function refresh(){const data=state(),guide=guides[data.guide],valid=validGoal(data.goal);$('goal-error').hidden=valid;$('goal').setAttribute('aria-invalid',String(!valid));
  $('summary-main').textContent=guide?`${guide.name} · ${focusNames[data.focus]}`:'복습할 저그 대응 교범을 선택하세요';
  $('summary-sub').textContent=guide?`취약점 ${fmt(data.weaknesses.length)}개 점검 · ${valid?`목표 ${fmt(data.goal)}회 복습`:'목표 횟수를 확인하세요'}`:'관찰 → 판단 → 대응';
  $('tips').replaceChildren();$('tips').hidden=!data.weaknesses.length;
  data.weaknesses.forEach(name=>$('tips').append(element('p',`${guide?.relevant.includes(name)?'교범 연계':'일반 점검'} · ${weaknessTips[name]}`)));renderManual(data);
}
function storageWarning(message){$('storage-warning').textContent=message;$('storage-warning').hidden=false;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(records));$('storage-warning').hidden=true;return true;}catch{storageWarning('브라우저 저장에 실패했습니다. 변경 내용은 현재 화면에서만 유지됩니다. 엑셀 파일로 기록을 보관하세요.');return false;}}
// 손상되거나 다른 형식인 데이터는 읽지 않습니다.
function isRecord(r){return r&&typeof r.id==='string'&&typeof r.title==='string'&&r.title.trim()&&Object.hasOwn(guides,r.guide)&&Object.hasOwn(focusNames,r.focus)&&Array.isArray(r.weaknesses)&&r.weaknesses.every(w=>Object.hasOwn(weaknessTips,w))&&validGoal(r.goal)&&Number.isInteger(r.done)&&r.done>=0&&r.done<=r.goal&&typeof r.memo==='string'&&typeof r.created==='string'&&Number.isFinite(Date.parse(r.created));}
try{const raw=localStorage.getItem(KEY);if(raw){const saved=JSON.parse(raw);if(!Array.isArray(saved))throw Error('형식 오류');records=saved.filter(isRecord);records=records.filter((r,i,a)=>a.findIndex(x=>x.id===r.id)===i);if(records.length!==saved.length)storageWarning('읽을 수 없는 일부 책갈피를 제외했습니다. 정상 기록은 복원했습니다.');}}catch{storageWarning('저장 기록을 읽지 못했습니다. 새 책갈피를 작성할 수 있습니다.');}
function renderRecords(){const box=$('bookmarks');box.replaceChildren();$('count').textContent=fmt(records.length);$('export').disabled=!records.length;
  if(!records.length){box.append(element('p','아직 저장한 저그 대응 교범이 없습니다.','empty'));return;}
  records.forEach(r=>{const card=element('article',undefined,'bookmark');card.append(element('h3',r.title),element('p',`${guides[r.guide].name} · ${focusNames[r.focus]}`),element('p',`취약점: ${r.weaknesses.join(', ')||'없음'}`),element('p',`메모: ${r.memo||'없음'}`),element('p',`${r.done===r.goal?'✓ 목표 달성':'복습 진행'} · ${fmt(r.done)} / ${fmt(r.goal)}회`,'progress-text'));
    const progress=document.createElement('progress');progress.max=r.goal;progress.value=r.done;progress.setAttribute('aria-label',`${r.title} 복습 진행`);card.append(progress,element('p',`저장: ${new Date(r.created).toLocaleString('ko-KR')}`));
    const actions=element('div',undefined,'card-actions');[['다시 보기',()=>loadRecord(r)],['복습 완료 +1',()=>{r.done++;persist();renderRecords();}],['삭제',()=>{records=records.filter(item=>item.id!==r.id);if(editingId===r.id)form.reset();persist();renderRecords();}]].forEach(([name,callback],index)=>{const button=element('button',name,'secondary'+(index===2?' delete':''));button.type='button';button.disabled=index===1&&r.done>=r.goal;button.addEventListener('click',callback);actions.append(button);});card.append(actions);box.append(card);
  });
}
function loadRecord(r){editingId=r.id;$('title').value=r.title;$('guide').value=r.guide;$('goal').value=r.goal;$('memo').value=r.memo;form.querySelectorAll('[name="focus"]').forEach(input=>input.checked=input.value===r.focus);form.querySelectorAll('[name="weakness"]').forEach(input=>input.checked=r.weaknesses.includes(input.value));$('save').textContent='책갈피 수정';$('confirmation').hidden=true;refresh();const section=$(`section-${r.focus}`);section.focus({preventScroll:true});section.scrollIntoView({behavior:'smooth',block:'center'});}
form.addEventListener('input',refresh);form.addEventListener('change',refresh);
form.addEventListener('reset',()=>{editingId=null;setTimeout(()=>{$('save').textContent='책갈피 저장';$('confirmation').hidden=true;refresh();},0);});
form.addEventListener('submit',event=>{event.preventDefault();const data=state();const error=!data.title?['책갈피 이름을 입력해주세요','title']:!data.guide?['저그 대응 교범을 선택해주세요','guide']:!validGoal(data.goal)?['복습 목표는 1~10 사이의 정수로 입력해주세요','goal']:null;if(error){alert(error[0]);$(error[1]).focus();return;}
  const previous=records.find(r=>r.id===editingId);const record={...data,id:previous?.id||(globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`),done:Math.min(previous?.done||0,data.goal),created:previous?.created||new Date().toISOString()};
  if(previous)records[records.indexOf(previous)]=record;else records.unshift(record);editingId=record.id;const saved=persist();renderRecords();$('save').textContent='책갈피 수정';$('confirmation').hidden=false;$('confirmation').textContent=`‘${data.title}’ 책갈피가 ${saved?'저장':'현재 화면에 반영'}되었습니다. ${guides[data.guide].name}의 ‘${focusNames[data.focus]}’를 ${fmt(data.goal)}회 복습할 계획입니다.`;
});
// 외부 라이브러리 없이 표준 XLSX(XML + ZIP) 파일을 생성합니다.
// 모든 사용자 문자열은 inlineStr로 저장하여 수식으로 실행되지 않습니다.
function xml(value){return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g,'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');}
function crc32(bytes){let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
function zip(files){const enc=new TextEncoder(),parts=[],central=[];let offset=0,centralSize=0;for(const [name,content]of Object.entries(files)){const filename=enc.encode(name),data=enc.encode(content),crc=crc32(data),header=new Uint8Array(30+filename.length),view=new DataView(header.buffer);view.setUint32(0,0x04034b50,true);view.setUint16(4,20,true);view.setUint16(12,33,true);view.setUint32(14,crc,true);view.setUint32(18,data.length,true);view.setUint32(22,data.length,true);view.setUint16(26,filename.length,true);header.set(filename,30);parts.push(header,data);const dir=new Uint8Array(46+filename.length),dv=new DataView(dir.buffer);dv.setUint32(0,0x02014b50,true);dv.setUint16(4,20,true);dv.setUint16(6,20,true);dv.setUint16(14,33,true);dv.setUint32(16,crc,true);dv.setUint32(20,data.length,true);dv.setUint32(24,data.length,true);dv.setUint16(28,filename.length,true);dv.setUint32(42,offset,true);dir.set(filename,46);central.push(dir);centralSize+=dir.length;offset+=header.length+data.length;}const end=new Uint8Array(22),ev=new DataView(end.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,central.length,true);ev.setUint16(10,central.length,true);ev.setUint32(12,centralSize,true);ev.setUint32(16,offset,true);return new Blob([...parts,...central,end],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});}
function createWorkbook(){const rows=[['책갈피 이름','대응 교범','중점 항목','취약점','메모','목표 횟수','완료 횟수','상태','저장 일시'],...records.map(r=>[r.title,guides[r.guide].name,focusNames[r.focus],r.weaknesses.join(', ')||'없음',r.memo,r.goal,r.done,r.done===r.goal?'목표 달성':'복습 중',new Date(r.created).toLocaleString('ko-KR')])];const ns='http://schemas.openxmlformats.org/spreadsheetml/2006/main';const sheet=`<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="${ns}"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="4" width="28" customWidth="1"/><col min="5" max="5" width="55" customWidth="1"/><col min="6" max="8" width="14" customWidth="1"/><col min="9" max="9" width="28" customWidth="1"/></cols><sheetData>${rows.map((row,i)=>`<row r="${i+1}" ht="${i===0?26:60}" customHeight="1">${row.map((value,j)=>`<c r="${String.fromCharCode(65+j)}${i+1}" s="${i===0?1:2}"${typeof value==='number'?'':' t="inlineStr"'}>${typeof value==='number'?`<v>${value}</v>`:`<is><t xml:space="preserve">${xml(value)}</t></is>`}</c>`).join('')}</row>`).join('')}</sheetData><autoFilter ref="A1:I${rows.length}"/></worksheet>`;
return zip({'[Content_Types].xml':'<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>',
'_rels/.rels':'<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
'xl/workbook.xml':`<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="${ns}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="대저그 복습 기록" sheetId="1" r:id="rId1"/></sheets></workbook>`,
'xl/_rels/workbook.xml.rels':'<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
'xl/styles.xml':`<?xml version="1.0"?><styleSheet xmlns="${ns}"><fonts count="2"><font><sz val="11"/><name val="Malgun Gothic"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Malgun Gothic"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF243F2A"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
'xl/worksheets/sheet1.xml':sheet});}
$('export').addEventListener('click',()=>{if(!records.length)return;try{const url=URL.createObjectURL(createWorkbook()),link=document.createElement('a');link.href=url;const date=new Date();link.download=`대저그_복습기록_${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}.xlsx`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);$('export-status').textContent=`${fmt(records.length)}개 기록의 엑셀 다운로드를 요청했습니다.`;}catch{$('export-status').textContent='엑셀 파일을 만들지 못했습니다. 다시 시도해주세요.';}});
refresh();renderRecords();

// 원본 이미지를 그대로 표시하는 도감과 빠른 탐색 버튼입니다.
const visualCaptions={ling:'포위당하기 전에, 퇴로부터.',bane:'귀여움과 폭발 반경은 별개다.',roach:'정면 승부에도 견적은 필요하다.',muta:'쫓아가면 지는 출퇴근 게임.',lurker:'안 보인다고 없는 것은 아니다.'};
Object.entries(guides).forEach(([key,guide],index)=>{
 const button=element('button',undefined,'guide-card');button.type='button';button.dataset.guide=key;button.setAttribute('aria-pressed','false');
 const art=element('span',undefined,'card-art');art.setAttribute('aria-hidden','true');art.style.backgroundImage=`url("assets/${key}.png")`;
 const label=element('span',undefined,'card-label');label.append(element('small',`FIELD NOTE / 0${index+1}`),document.createTextNode(guide.name));button.append(art,label);
 button.addEventListener('click',()=>{$('guide').value=key;refresh();$('manual-heading').scrollIntoView({behavior:'smooth',block:'start'});});$('guide-cards').append(button);
});
const originalRenderManual=renderManual;
renderManual=function(data){originalRenderManual(data);document.querySelectorAll('.guide-card').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.guide===data.guide)));const figure=element('figure',undefined,'manual-visual');const img=document.createElement('img');img.src=data.guide?'assets/'+data.guide+'.png':'assets/carbot-zerg-original.png';img.alt=data.guide?guides[data.guide].name+' 캐릭터':'첨부한 카봇 저그 캐릭터 모음';img.width=data.guide?1254:806;img.height=data.guide?1254:416;figure.append(img,element('figcaption',data.guide?visualCaptions[data.guide]:'카봇 저그 도감 · 외모는 귀여워도 대응은 진지하게.'));$('manual-content').prepend(figure);};
$('open-art').addEventListener('click',()=>$('art-dialog').showModal());$('close-art').addEventListener('click',()=>$('art-dialog').close());$('art-dialog').addEventListener('click',event=>{if(event.target===$('art-dialog'))$('art-dialog').close();});
refresh();



// 교범의 생존 수칙을 교관 말풍선과 동기화합니다.
const instructorRenderManual=renderManual;
renderManual=function(data){instructorRenderManual(data);$('instructor-tip').textContent=data.guide?'신병, 기억해라! '+guides[data.guide].rule:'자, 신병! 위에서 적을 골라라. 시험은 객관식인데 실전은 부활 버튼이 없다.';};
refresh();
