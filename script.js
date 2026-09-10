// ภาพปก รูปย่อ และหน้าดูภาพ ใช้รายการ data-gallery บนการ์ดร่วมกัน
function normalizeGallery(value) {
  const list = Array.isArray(value) ? value : String(value || '').split(',');
  return [...new Set(list.filter(item => typeof item === 'string')
    .map(item => item.trim().replace(/\\/g, '/').replace(/^\.\//, '')).filter(Boolean))];
}

function renderActivityGallery(card) {
  const files = normalizeGallery(card.dataset.gallery);
  card.dataset.gallery = files.join(', ');
  const media = card.querySelector('.activity-media');
  const link = card.querySelector('.activity-gallery-link');
  if (!media) return;
  media.replaceChildren();
  media.hidden = files.length === 0;
  if (link) {
    link.hidden = files.length === 0;
    const label = link.querySelector('span');
    if (label) label.textContent = `ดูภาพทั้งหมด (${files.length})`;
  }
  card.classList.toggle('activity-no-media', files.length === 0);
  let thumbnails;
  files.forEach((src, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `open-cert-modal ${index === 0 ? 'activity-cover' : 'activity-thumbnail'}`;
    button.dataset.certImg = src;
    button.setAttribute('aria-label', `${card.dataset.galleryTitle} — ภาพที่ ${index + 1} จาก ${files.length}`);
    const img = document.createElement('img');
    img.alt = `${card.dataset.galleryTitle} — ภาพที่ ${index + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      card.dataset.gallery = normalizeGallery(card.dataset.gallery).filter(file => file !== src).join(', ');
      renderActivityGallery(card);
    }, { once: true });
    img.src = src;
    button.append(img);
    if (index === 0) {
      const count = document.createElement('span');
      count.className = 'activity-photo-count';
      count.textContent = `ดูภาพทั้งหมด ${files.length} ภาพ`;
      button.append(count);
      media.append(button);
    } else {
      if (!thumbnails) {
        thumbnails = document.createElement('div');
        thumbnails.className = 'activity-thumbnails';
        media.append(thumbnails);
      }
      thumbnails.append(button);
    }
  });
}

// รายละเอียดผลงาน
const projectDetails = {
  "dekhor": {
    "title": "DekHor — แพลตฟอร์มแนะนำหอพักและคู่มือการใช้ชีวิต",
    "category": "การพัฒนา Frontend และ UX/UI",
    "subtitle": "แพลตฟอร์มค้นหาหอพักและคู่มือชีวิตนักศึกษาที่เข้าถึงได้ง่าย",
    "badges": [
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "GitHub Pages",
      "a11y"
    ],
    "github": "https://github.com/KanokwanPh/DekHorrr-66",
    "demo": "#",
    "summary": "DekHor พัฒนาขึ้นเพื่อแก้ปัญหาการหาที่พักและการใช้ชีวิตของนักศึกษาในประเทศไทย เริ่มจากการสัมภาษณ์ผู้ใช้จนถึงเผยแพร่เว็บไซต์ โดยแยก CSS เป็นส่วนที่ดูแลต่อได้ง่าย มีตัวกรองการค้นหาที่รองรับหลายขนาดหน้าจอ คอนทราสต์สีที่อ่านได้ชัดเจน และการนำทางที่ต่อเนื่อง",
    "keyContributions": [
      "พัฒนา การจัดวางหน้าเว็บที่เน้นมือถือเป็นหลักและปรับตามขนาดหน้าจอด้วย CSS และแท็ก HTML5 ที่สื่อความหมาย",
      "ออกแบบองค์ประกอบ UI ด้วย Figma ตั้งแต่ต้นจนจบ ภายใต้แนวคิดคู่มือการใช้ชีวิตนักศึกษา",
      "กำหนดคอนทราสต์สีของข้อความและองค์ประกอบที่โต้ตอบได้ตามเกณฑ์ WCAG AA",
      "เผยแพร่โครงการผ่าน GitHub Pages พร้อมตรวจสอบการจัดวางหน้าเว็บ บนอุปกรณ์หลายขนาดด้วยระบบอัตโนมัติ"
    ],
    "artifacts": null
  },
  "coffee-qa": {
    "title": "Coffee Shop Ordering — ออกแบบการทดสอบ QA และจัดทำเอกสาร",
    "category": "การทดสอบซอฟต์แวร์และวิศวกรรม QA",
    "subtitle": "วางแผน QA ออกแบบ Test Case และจัดทำชุดรายงานข้อบกพร่องอย่างเป็นระบบ",
    "badges": [
      "การออกแบบการทดสอบ",
      "การวิเคราะห์ SRS",
      "QA โดยใช้ AI ช่วย",
      "กรณีทดสอบ",
      "รายงานข้อบกพร่อง",
      "Markdown"
    ],
    "github": "https://github.com/KanokwanPh/Coffee-Shop-Ordering",
    "demo": "#",
    "summary": "โครงการออกแบบการทดสอบ QA จำลองกระบวนการทดสอบระบบสั่งกาแฟตั้งแต่ต้นจนจบ มุ่งแปลงความต้องการทางธุรกิจใน SRS เป็นแผนทดสอบ สถานการณ์ทดสอบที่จัดลำดับตามความเสี่ยง กรณีทดสอบค่าขอบเขต และเอกสารติดตามข้อบกพร่องที่มีรูปแบบมาตรฐาน",
    "keyContributions": [
      "วิเคราะห์ข้อกำหนด SRS เพื่อระบุขั้นตอนหลักของผู้ใช้ เงื่อนไขขอบเขต และกรณีพิเศษที่อาจเกิดขึ้น",
      "ใช้เครื่องมือ AI ช่วยระดมความคิดและปรับปรุงสถานการณ์ทดสอบมากกว่า 40 รายการ ให้ครอบคลุมการทำงานและตรรกะทางธุรกิจ",
      "จัดทำตาราง Test Case และตารางติดตามความต้องการ (RTM) เชื่อมโยงกับข้อกำหนดทางธุรกิจ",
      "เขียนรายงานข้อบกพร่องด้วย Markdown ระบุระดับความรุนแรง ขั้นตอนที่ทำให้เกิดปัญหาซ้ำ และผลลัพธ์ที่คาดหวังเทียบกับผลลัพธ์จริง"
    ],
    "artifacts": null
  },
  "shareu": {
    "title": "ShareU — แพลตฟอร์มยืมสิ่งของระหว่างนักศึกษา",
    "category": "การออกแบบ UX/UI และต้นแบบที่ใกล้เคียงงานจริง",
    "subtitle": "ระบบแบ่งปันสิ่งของและจองอุปกรณ์ในมหาวิทยาลัยอย่างยั่งยืน",
    "badges": [
      "Canva",
      "การออกแบบต้นแบบ",
      "แผนภาพโมเดลธุรกิจ",
      "แผนผังเส้นทางผู้ใช้",
      "การออกแบบ Wireframe"
    ],
    "github": "https://drive.google.com/drive/folders/1nBEgvkyOGgPCb-tvnRFKHm_axNBRrRMI?usp=sharing",
    "demo": "#",
    "summary": "ShareU ช่วยให้นักศึกษาแบ่งปันและยืมอุปกรณ์การเรียน เครื่องคิดเลข อุปกรณ์ห้องปฏิบัติการ และอุปกรณ์กีฬาได้อย่างปลอดภัยภายในชุมชนมหาวิทยาลัย ออกแบบโดยยึดผู้ใช้เป็นศูนย์กลาง ผ่านการสร้างแบบจำลองผู้ใช้ (Persona) วิเคราะห์เส้นทางผู้ใช้ และจัดทำต้นแบบที่โต้ตอบได้",
    "keyContributions": [
      "สรุปปัญหาของนักศึกษาเป็นแบบจำลองผู้ใช้ (Persona) และลำดับขั้นตอนการยืมสิ่งของอย่างเป็นระบบ",
      "สร้างภาพจำลองหน้าจอแอปและสื่อนำเสนอครบชุดด้วย Canva",
      "ออกแบบเส้นทางผู้ใช้ตั้งแต่ค้นหาสิ่งของ ส่งคำขอ ตรวจสอบการส่งมอบ จนถึงติดตามการคืน",
      "ผสานแนวทางความเป็นไปได้ทางธุรกิจให้สอดคล้องกับการแบ่งปันทรัพยากรในมหาวิทยาลัยอย่างยั่งยืน"
    ],
    "artifacts": null
  },
  "reporthub": {
    "title": "ReportHub — ระบบรับแจ้งปัญหาในมหาวิทยาลัยอัตโนมัติ",
    "category": "ขั้นตอนการทำงานและระบบอัตโนมัติด้วย n8n",
    "subtitle": "ระบบรับแจ้งและส่งต่อปัญหาอัตโนมัติ",
    "badges": [
      "n8n",
      "Webhooks",
      "REST API",
      "Google Sheets API",
      "JSON Schema",
      "Google Gemini AI",
      "JavaScript"
    ],
    "github": "https://drive.google.com/drive/folders/1gDZ4cHUMi8AYSTYFE2cO1h6n5RjA_zCB?usp=sharing",
    "demo": "#",
    "summary": "ReportHub เป็น ระบบอัตโนมัติอัจฉริยะสำหรับรับแจ้งปัญหาในมหาวิทยาลัยโดยอัตโนมัติ เชื่อม n8n กับ Google Gemini AI Agent เพื่อประมวลผลข้อมูลที่ส่งเข้ามา อัปโหลดไฟล์แนบไปยัง Google Drive จัดหมวดหมู่และลำดับความสำคัญของเรื่องแจ้ง และบันทึกข้อมูลลง Google Sheets",
    "keyContributions": [
      "ออกแบบ ขั้นตอนการทำงานอัตโนมัติแบบหลายเงื่อนไขใน n8n เพื่อรับ Webhook และอัปโหลดไฟล์ไปยัง Google Drive",
      "เชื่อม Google Gemini AI Agent พร้อมหน่วยความจำบริบท เพื่อวิเคราะห์ สรุป และจัดหมวดหมู่ปัญหาของนักศึกษา",
      "เขียน JavaScript ใน Code Node เพื่อจัดรูปแบบข้อมูล แยกข้อความ และแปลง Payload",
      "ทำระบบบันทึกข้อมูลและติดตามสถานะแบบสองทางในฐานข้อมูลหลัก Google Sheets แบบเรียลไทม์"
    ],
    "artifacts": null
  },
  "todolist-qa": {
    "title": "TodoList-QA — ชุดงานทดสอบเว็บแอป",
    "category": "การทดสอบซอฟต์แวร์และวิศวกรรม QA",
    "subtitle": "ทดสอบการทำงานจริงร่วมกับ Smoke Test อัตโนมัติด้วย Python (ผ่าน 50%)",
    "badges": [
      "ทดสอบ QA ด้วยตนเอง",
      "Python Requests",
      "BeautifulSoup4",
      "การทดสอบการทำงาน",
      "รายงานข้อบกพร่อง",
      "การตรวจสอบ DOM"
    ],
    "github": "https://github.com/KanokwanPh/TodoList-QA",
    "demo": "#",
    "summary": "โครงการฝึกปฏิบัติตรวจสอบ QA บนเว็บแอป To-Do List อย่างเป็นระบบ ทดสอบ 10 สถานการณ์ ครอบคลุมขั้นตอนหลัก การตรวจสอบข้อมูลนำเข้าที่ค่าขอบเขต การจัดเก็บข้อมูลให้คงอยู่หลังรีเฟรช และการแสดงผล UI ได้ผลผ่าน 5 รายการ / ไม่ผ่าน 5 รายการ พร้อมจัดทำรายงานข้อบกพร่องอย่างเป็นทางการ 5 ฉบับในระดับความรุนแรงต่างกัน",
    "keyContributions": [
      "ทดสอบการทำงาน 10 สถานการณ์ โดยตรวจสอบด้วย Chrome ด้วยตนเอง ร่วมกับ DOM Smoke Test อัตโนมัติด้วย Python และ BeautifulSoup",
      "พบข้อบกพร่องสำคัญของ UI และตรรกะ ได้แก่ ปุ่มลบไม่ทำงาน (BUG-002) และไม่มีการบันทึกลง localStorage ทำให้ข้อมูลหายทั้งหมดเมื่อรีเฟรช (BUG-003)",
      "พบข้อผิดพลาดการตรวจสอบข้อมูลนำเข้าที่ค่าขอบเขต ได้แก่ เพิ่มงานที่ไม่มีข้อความได้ (BUG-001) และไม่จำกัดความยาวข้อความจนหน้าเว็บแสดงผลผิดรูปแบบ (BUG-004)",
      "รายงานข้อบกพร่องของเขตเวลา ทำให้เวลาของงานที่แสดงช้ากว่าเวลาท้องถิ่นจริง 7 ชั่วโมง (BUG-005)",
      "จัดทำรายงานข้อบกพร่องตามรูปแบบมาตรฐาน ระบุความรุนแรง สูง/กลาง/ต่ำ ขั้นตอนที่ทำให้เกิดปัญหาซ้ำ ผลลัพธ์ที่คาดหวังเทียบกับผลลัพธ์จริง และสถานะข้อบกพร่องที่ยังรอแก้ไข"
    ],
    "artifacts": null
  },
  "littlekids": {
    "title": "LITTLEKIDS — แพลตฟอร์มพัฒนาการและการเรียนรู้สำหรับเด็ก",
    "category": "การพัฒนา Frontend และ UX/UI",
    "subtitle": "แอปการเรียนรู้ปฐมวัยแบบโต้ตอบ พร้อมขั้นตอนการทำงานและตารางข้อมูลเชิงสัมพันธ์",
    "badges": [
      "การออกแบบ UI/UX",
      "การพัฒนาแอปมือถือ",
      "ลำดับการทำงานของระบบ (Flowchart)",
      "การออกแบบโครงสร้างฐานข้อมูล",
      "การสร้างต้นแบบที่โต้ตอบได้",
      "กลยุทธ์เนื้อหาเพื่อการศึกษา"
    ],
    "github": "https://drive.google.com/drive/folders/1eCalMRKKkF-Dln_fYxlaQeZlORbqtG19?usp=drive_link",
    "demo": "#",
    "summary": "LITTLEKIDS เป็นแอปมือถือเพื่อการศึกษาปฐมวัย พัฒนาด้วย AppSheet เชื่อมต่อ Google Sheets ออกแบบลำดับการทำงานของระบบด้วยผังงาน (Flowchart) อย่างชัดเจน เพื่อจัดการเนื้อหาใน 6 หมวดหลัก ได้แก่ คำศัพท์ นิทาน หนังสือ ดนตรี สินค้า และการเรียนรู้เพื่อป้องกันการกลั่นแกล้ง",
    "keyContributions": [
      "พัฒนาแอปมือถือที่ใช้งานได้ด้วย AppSheet พร้อมปรับรูปแบบหน้าจอและแถบนำทางด้านล่าง",
      "ออกแบบผังงาน (Flowchart) แบบแตกแขนง แสดงเส้นทางการนำทาง การกรองหมวดหมู่ และการเลือกเนื้อหา",
      "ออกแบบตารางข้อมูลเชิงสัมพันธ์ใน Google Sheets เพื่อจัดเก็บข้อมูลสื่อ ลิงก์นิทานภายนอก และรายการสินค้า",
      "กำหนดการทำงานของสื่อโต้ตอบ รวมถึงเปิดลิงก์นิทานอีสปภายนอกและแสดงตัวอย่างวิดีโอเพลงสำหรับเด็ก"
    ],
    "artifacts": null
  },

  "SqlSchool": {
    "title": "SQL SCHOOL — ระบบบริหารจัดการข้อมูลสารสนเทศโรงเรียน",
    "category": "การออกแบบฐานข้อมูล และ การวิเคราะห์ระบบ",
    "subtitle": "การออกแบบโครงสร้างฐานข้อมูลเชิงสัมพันธ์ แผนผัง ER-Diagram และพจนานุกรมข้อมูล (Data Dictionary)",
    "badges": [
      "SQL / Relational Database",
      "การออกแบบ ER-Diagram",
      "Data Dictionary",
      "การวิเคราะห์ระบบ (System Analysis)",
      "Database Key Design",
      "การออกแบบ UI ต้นแบบ"
    ],
    "github": "https://drive.google.com/drive/folders/1CNIQl8XJpxjqkTIm0yqO7au7VIpHAsWg?usp=drive_link",
    "demo": "#",
    "summary": "SQL SCHOOL เป็นการออกแบบระบบฐานข้อมูลเชิงสัมพันธ์เพื่อรองรับการทำงานของโรงเรียน โดยแบ่งกลุ่มผู้ใช้งานออกเป็น นักเรียน ครู และผู้ดูแลระบบ (Admin) ครอบคลุมตั้งแต่การสมัครเรียน ตารางเรียน-ตารางสอน จนถึงการประมวลผลการเรียนและออกรายงานอย่างเป็นระบบ",
    "keyContributions": [
      "วิเคราะห์ความต้องการและกำหนดขอบเขตหน้าที่ของผู้ใช้งาน 3 กลุ่ม ได้แก่ นักเรียน ครูผู้สอน และผู้ดูแลระบบ (Admin)",
      "ออกแบบแผนภาพความสัมพันธ์ของข้อมูล (ER-Diagram) และ Entity หลัก 8 ตาราง พร้อมจำแนกความสัมพันธ์แบบ 1:1, 1:N และ M:N",
      "กำหนด Composite Primary Key และ Foreign Key เพื่อเชื่อมโยงความสัมพันธ์และป้องกันการบันทึกข้อมูลซ้ำซ้อนในระบบ",
      "จัดทำพจนานุกรมข้อมูล (Data Dictionary) กำหนด Data Type, ความยาว และ Constraints (Not Null) ตามมาตรฐาน RDBMS"
    ],
    "artifacts": null
  },
};

// Aliases for SqlSchool key
projectDetails['sql-school'] = projectDetails['SqlSchool'];
projectDetails['sqlschool'] = projectDetails['SqlSchool'];

// Global Open & Close Handlers (Exposed on window object)
window.openProjectModal = function (projectId) {
  const projectModal = document.getElementById('project-modal');
  if (!projectId || !projectModal) return;

  const normalizedKey = (projectId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const foundKey = Object.keys(projectDetails).find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedKey) || projectId;
  const data = projectDetails[foundKey] || projectDetails[projectId];
  if (!data) return;

  const titleEl = document.getElementById('modal-title');
  const catEl = document.getElementById('modal-category');
  const subEl = document.getElementById('modal-subtitle');
  const sumEl = document.getElementById('modal-summary');

  if (titleEl) titleEl.textContent = data.title;
  if (catEl) catEl.textContent = data.category;
  if (subEl) subEl.textContent = data.subtitle;
  if (sumEl) sumEl.textContent = data.summary;

  const linkBtn = document.getElementById('modal-github-link');
  if (linkBtn) {
    if (!data.github || data.github === '#' || data.github === '') {
      linkBtn.style.display = 'none';
    } else {
      linkBtn.style.display = 'inline-flex';
      linkBtn.setAttribute('href', data.github);
      linkBtn.setAttribute('target', '_blank');
      linkBtn.setAttribute('rel', 'noopener noreferrer');

      const url = data.github.toLowerCase();
      if (url.includes('drive.google.com')) {
        linkBtn.innerHTML = `
          <svg class="w-3.5 h-3.5 mr-1.5 inline-block fill-current" viewBox="0 0 24 24">
            <path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 15L6.3 21h13.12l3.43-6M22.85 15l-6.57-11.5h-6.85L16 15"/>
          </svg> Google Drive
        `;
      } else if (url.includes('github.com')) {
        linkBtn.innerHTML = `
          <svg class="w-3.5 h-3.5 mr-1.5 inline-block fill-current" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg> ดูโค้ดบน GitHub
        `;
      } else {
        linkBtn.innerHTML = `
          <svg class="w-3.5 h-3.5 mr-1.5 inline-block stroke-current fill-none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg> เปิดลิงก์
        `;
      }
    }
  }

  const badgesContainer = document.getElementById('modal-badges');
  if (badgesContainer && data.badges) {
    badgesContainer.innerHTML = data.badges.map(b =>
      `<span class="text-xs bg-stone-100 text-stone-800 font-mono px-2.5 py-1 rounded-md border border-stone-200">${b}</span>`
    ).join('');
  }

  const contributionsContainer = document.getElementById('modal-contributions');
  if (contributionsContainer && data.keyContributions) {
    contributionsContainer.innerHTML = data.keyContributions.map(c =>
      `<li class="flex items-start gap-2 text-stone-600"><span class="text-[#D9776C] font-bold">•</span><span>${c}</span></li>`
    ).join('');
  }

  projectModal.classList.remove('hidden');
  projectModal.classList.add('flex', 'active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) window.lucide.createIcons();
};

window.closeProjectModal = function () {
  const projectModal = document.getElementById('project-modal');
  if (!projectModal) return;
  projectModal.classList.remove('flex', 'active');
  projectModal.classList.add('hidden');
  document.body.style.overflow = '';
};

window.toggleResumeModal = function (open, imgSrc = '') {
  const resumeModal = document.getElementById('resume-modal');
  const resumeFrame = document.getElementById('resume-modal-iframe');
  const resumeLink = document.getElementById('resume-pdf-link');
  if (!resumeModal) return;
  if (open) {
    const pdfSrc = imgSrc || 'photo/STEng.pdf';
    if (resumeFrame) resumeFrame.src = pdfSrc;
    if (resumeLink) resumeLink.href = pdfSrc;
    resumeModal.classList.remove('hidden');
    resumeModal.classList.add('flex', 'active');
    document.body.style.overflow = 'hidden';
  } else {
    resumeModal.classList.remove('flex', 'active');
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

let currentCertGallery = [];
let currentCertGalleryIndex = 0;

window.toggleCertModal = function (open, fileSrc = '', title = '', issuer = '', galleryData = null) {
  const certModal = document.getElementById('cert-modal');
  if (!certModal) return;

  if (open) {
    const cleanFileSrc = normalizeGallery([fileSrc])[0] || '';
    currentCertGallery = normalizeGallery(galleryData || [cleanFileSrc]);
    if (!currentCertGallery.length) return;
    currentCertGalleryIndex = Math.max(0, currentCertGallery.indexOf(cleanFileSrc));

    // 4. อัปเดตข้อความหัวข้อ
    const titleEl = document.getElementById('cert-modal-title');
    const subtitleEl = document.getElementById('cert-modal-subtitle');
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = issuer;

    // 5. แสดงรูปภาพและตัวนับ
    window.updateCertModalMedia();

    certModal.classList.remove('hidden');
    certModal.classList.add('flex', 'active');
    document.body.style.overflow = 'hidden';
  } else {
    certModal.classList.remove('flex', 'active');
    certModal.classList.add('hidden');
    document.body.style.overflow = '';
    currentCertGallery = [];
    currentCertGalleryIndex = 0;
  }
};


window.updateCertModalMedia = function () {
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalPdf = document.getElementById('cert-modal-pdf');
  const prevBtn = document.getElementById('cert-modal-prev');
  const nextBtn = document.getElementById('cert-modal-next');
  const counterEl = document.getElementById('cert-modal-counter');

  if (currentCertGallery.length === 0) return;
  const fileSrc = currentCertGallery[currentCertGalleryIndex];
  const isPdf = fileSrc.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    if (certModalImg) certModalImg.classList.add('hidden');
    if (certModalPdf) {
      certModalPdf.src = fileSrc;
      certModalPdf.classList.remove('hidden');
    }
  } else {
    if (certModalPdf) certModalPdf.classList.add('hidden');
    if (certModalImg) {
      certModalImg.alt = `${document.getElementById('cert-modal-title').textContent} — ภาพที่ ${currentCertGalleryIndex + 1}`;
      certModalImg.src = fileSrc;
      certModalImg.classList.remove('hidden');
    }
  }

  if (currentCertGallery.length > 1) {
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
    if (counterEl) {
      counterEl.classList.remove('hidden');
      counterEl.style.display = 'inline-block';
      counterEl.textContent = `${currentCertGalleryIndex + 1} / ${currentCertGallery.length}`;
    }
  } else {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (counterEl) {
      counterEl.classList.add('hidden');
      counterEl.style.display = 'none';
    }
  }
};

window.prevCertMedia = function () {
  if (currentCertGallery.length <= 1) return;
  currentCertGalleryIndex = (currentCertGalleryIndex - 1 + currentCertGallery.length) % currentCertGallery.length;
  window.updateCertModalMedia();
};

window.nextCertMedia = function () {
  if (currentCertGallery.length <= 1) return;
  currentCertGalleryIndex = (currentCertGalleryIndex + 1) % currentCertGallery.length;
  window.updateCertModalMedia();
};

// Global Delegated Event Listener for all modal triggers
document.addEventListener('click', (e) => {
  const projectBtn = e.target.closest('.open-project-modal');
  if (projectBtn) {
    e.preventDefault();
    e.stopPropagation();
    const pid = projectBtn.getAttribute('data-project');
    if (pid) {
      window.openProjectModal(pid);
    }
    return;
  }

  const resumeBtn = e.target.closest('.open-resume-modal');
  if (resumeBtn) {
    e.preventDefault();
    e.stopPropagation();
    const customImg = resumeBtn.getAttribute('data-cv-pdf') || 'photo/STEng.pdf';
    window.toggleResumeModal(true, customImg);
    return;
  }

  const certBtn = e.target.closest('.open-cert-modal');
  if (certBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = certBtn.closest('.activity-card');
    const galleryData = card ? card.dataset.gallery : certBtn.getAttribute('data-cert-gallery');
    const imgSrc = certBtn.getAttribute('data-cert-img') || normalizeGallery(galleryData)[0];
    const title = card ? card.dataset.galleryTitle : certBtn.getAttribute('data-cert-title') || 'ดูประกาศนียบัตร';
    const issuer = card ? card.dataset.galleryIssuer : certBtn.getAttribute('data-cert-issuer') || 'ข้อมูลประกาศนียบัตร';
    if (imgSrc) {
      window.toggleCertModal(true, imgSrc, title, issuer, galleryData);
    }
    return;
  }
});

// Initialization Function
function initPortfolio() {
  document.querySelectorAll('.activity-card').forEach(renderActivityGallery);
  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.querySelectorAll('.open-cert-modal:not(button)').forEach(trigger => {
    trigger.setAttribute('role', 'button');
    trigger.tabIndex = 0;
    trigger.setAttribute('aria-label', `ดู ${trigger.dataset.certTitle || 'ประกาศนียบัตร'}`);
    trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); trigger.click(); }
    });
  });

  // Mobile Drawer Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const toggleDrawer = (open) => {
    if (!mobileDrawer) return;
    if (open) {
      if (mobileDrawerBackdrop) {
        mobileDrawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        mobileDrawerBackdrop.classList.add('opacity-100', 'pointer-events-auto');
      }
      mobileDrawer.classList.remove('-translate-y-full');
      mobileDrawer.classList.add('translate-y-0');
      document.body.style.overflow = 'hidden';
    } else {
      if (mobileDrawerBackdrop) {
        mobileDrawerBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
        mobileDrawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
      }
      mobileDrawer.classList.remove('translate-y-0');
      mobileDrawer.classList.add('-translate-y-full');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleDrawer(true));
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  drawerLinks.forEach(link => link.addEventListener('click', () => toggleDrawer(false)));

  // Category Tab Filtering
  const tabBtns = document.querySelectorAll('.tab-pill');
  const projectCards = document.querySelectorAll('.project-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (
          filter === 'all' ||
          cat === filter ||
          (filter === 'database' && (cat === 'database' || cat === 'การออกแบบฐานข้อมูล'))
        ) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Close Buttons
  const closeModalBtn = document.getElementById('close-project-modal');
  const projectModal = document.getElementById('project-modal');
  if (closeModalBtn) closeModalBtn.addEventListener('click', window.closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) window.closeProjectModal();
    });
  }

  const closeResumeBtn = document.getElementById('close-resume-modal');
  const resumeModal = document.getElementById('resume-modal');
  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.toggleResumeModal(false);
    });
  }
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) window.toggleResumeModal(false);
    });
  }

  const closeCertModalBtn = document.getElementById('close-cert-modal');
  const certModal = document.getElementById('cert-modal');
  if (closeCertModalBtn) {
    closeCertModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.toggleCertModal(false);
    });
  }
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) window.toggleCertModal(false);
    });
  }

  // Email Copy Handler
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'kanokwan.phoo@gmail.com';
      if (!navigator.clipboard?.writeText) {
        window.prompt('คัดลอกอีเมลเพื่อติดต่อ', email);
        return;
      }
      navigator.clipboard.writeText(email).then(() => {
        alert(`คัดลอกอีเมล ${email} แล้ว`);
      }).catch(() => {
        alert(`อีเมล: ${email}`);
      });
    });
  });

  // ESC Key listener
  document.addEventListener('keydown', (e) => {
    if (certModal && !certModal.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); window.prevCertMedia(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); window.nextCertMedia(); }
    }
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('translate-y-0')) toggleDrawer(false);
      if (certModal && !certModal.classList.contains('hidden')) window.toggleCertModal(false);
      if (resumeModal && !resumeModal.classList.contains('hidden')) window.toggleResumeModal(false);
      if (projectModal && !projectModal.classList.contains('hidden')) window.closeProjectModal();
    }
  });
}

// Guaranteed execution whether DOM is loading or already parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
