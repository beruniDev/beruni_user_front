import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Linkify from "src/components/Linkify";
import { tokenSelector } from "src/store/reducers/auth";
import { useAppSelector } from "src/store/utils/types";

const MainPreview = () => {
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);

  useEffect(() => {
    if (!!token) navigate("/admin/add");
  }, [token]);

  return (
    <div className="overflow-y-auto content flex flex-[7] md:flex-row flex-col h-full z-10 relative">
      <div className="flex flex-col flex-[5]">
        <Linkify
          className="indent-6"
          text={`The аl-Biruni Institute of Oriental Studies has a manuscript collection containing more than 26,000 manuscripts, 39,000 lithographed and printed books, and more than 5,000 historical documents. Thematically, the manuscripts relate to history, philology, philosophy, Islamic sciences, exact and natural sciences. Among scientific books there are more 1500 manuscripts of works on astronomy, mathematics, chemistry, medicine, pharmacology, mineralogy and geography by such scientists of the 10th-19th centuries as Abu Bakr al-Rаzi (865-925), Abu Nasr al-Fаrаbi (873-950), Abu Rayhan al-Biruni (973-1048), Abu Mansur al-Qumri (10th century), Abu Ali ibn Sina (980-1037), Isma'il al-Jurjani (1042-1136), Nasir al-Din al-Tusi (1201-1274), Mahmud al-Chaghmini (d. 1221), Ibn al-Nafis (d.1288. ), Sa'd al-Din al-Taftazani (1322-1390), Jamshid al-Kashi (d. 1436), Qazizada al-Rumi (1360-1437), Mirza Ulughbek (1394-1449), Ali Qushchi (1402-1474), Nizam al-Din al-Birjandi (d. 1525), Ahmad Danish (1827-1897) and others. The study of the works of these authors is one of the priority areas of research of the al-Biruni Institute. Among them, the works of Abu Rayhan al-Biruni occupy a special place, since as a polymath he wrote about 150 works on several branches of science. Although, according to P.G. Bulgakov and A. Akhmedov, only 33 of them have come down to us, among them are his fundamental and voluminous works. They have been translated into Uzbek and Russian for many years and researched by the Institute's staff. Al-Biruni's translated books include his major works such as "Chronology", "India", "Coordinates", "Canon of Mas’ud", "Pharmacognosy", "Mineralogy",  "Introduction to Astrology" and there are also small mathematical ("Chords") and astronomical treatises ("Cartography", "Ghurrat al-Zijat", " Shadows",  "Transits", "Solar equation"). In translating these works, Uzbek scientists used microfilms of manuscripts obtained from foreign libraries. Because, unfortunately, there is only one manuscript of the 13th century "Tafhim" by al-Biruni in Uzbekistan. In 2023, the 1050th anniversary of Abu Rayhan al-Biruni was celebrated internationally under the aegis of UNESCO. On this occasion, an international conference "The role of the scientific heritage of Аbu Rayhan al-Biruni in the development of world science" was held, at which promising tasks for developing research on the scientific heritage of al-Biruni were determined. In particular, for the fruitful continuation of research on al-Biruni's works in Uzbekistan, in 05.09.2023-05.09.2024, a scientific project was carried out, which aimed to collect electronic copies of manuscripts of al-Biruni's works from foreign collections at the Institute, describe them and upload the descriptions on the heritageofberuni.uz website. As a result, electronic copies of manuscripts of al-Biruni's works were obtained, where possible, from various scientific, and educational institutions and libraries in Turkey, Iran, India, the UK, the Netherlands, Italy and Germany. Descriptions of these copies in English were posted on the heritageofberuni.uz website.`}
        />

        <Linkify
          className="mt-2 indent-6"
          text={`To date, several websites have been created in the world where one can obtain information about the scientific heritage of al-Biruni. For example, the website of the Russian Public Library contains a biography of al-Biruni, 7 volumes (8 books) of the Russian series "Abu Rayhan Beruni.  Izbrannyye proizvedeniya", published in 1957-1976 and 1995. There is also correspondence between al-Biruni and Abu Ali ibn Sina (980-1037). There are photographs of the book covers. These books can be downloaded. Website address: http://publ.lib.ru/ARCHIVES/B/BIRUNI_Abu_Reyhan/_Biruni_A.R..html#001

`}
        />

        <Linkify
          className="mt-2 indent-6"
          text={`Another website belongs to the Islamic Encyclopedia of the Turkish State Waqf - Тurkiye Diyanet Vakfi İslâm Ansiklopedisi' (TDV İslâm Ansiklopedisi'). Its updated version was launched at islamansiklopedisi.org in 2018. It provides information about the religion of Islam, the history of Islam and Islamic civilization, hadiths, Arabic language and literature, the history of science, medicine and other areas. In particular, information about the life and scientific work of al-Biruni is presented, such as the title and content of 26 works of the scientist, about the researchers of al-Biruni's works for the period 1951-1985, as well as a bibliography of books and articles for 1951-1988. A portrait of al-Biruni and illustrations from two of his works are posted. This site can be found at: https://islamansiklopedisi.org.tr/biruni`}
        />

        <Linkify
          className="mt-2 indent-6"
          text={`The Islamic Science Manuscript Initiative (ISMI) website is a special website on the history of science, containing information on manuscripts of works by medieval Muslim scientists on the exact sciences. It can be called an online successor to G. Suter's book "Beiträge zur Geschichte der Mathematik und Astronomie im Islam" (1872) and the work by G.P. Matviyevskaya and B.A. Rosenfeld  «Matematiki i astronomy musul'manskogo srednevekov'ya i ikh trudy (VIII-XVII vv.)» ("Mathematicians and astronomers of the Muslim Middle Ages and their works (8th-17th centuries)") (1983). The latter work was supplemented and published in 2003 by B.A. Rosenfeld and the Turkish scholar E. Ihsanoghlu (Rozenfeld, Boris, and Ekmeleddin İhsanoğlu. Mathematicians, Astronomers and Other Scholars of Islamic Civilisation and Their Works (7th-19th c.). Istanbul: Research Centre for Islamic History, Art, and Culture, 2003). This book was also used on the website. The site contains information about the life and scientific activities of al-Biruni, and about his associates. Information is presented on 20 works by al-Biruni, included in the book mentioned above by B.A. Rosenfeld and E. Ihsanoghlu. These works are divided into 7 thematic groups, their titles are given, and for 7 of them, there is information on the location of their manuscripts. For example, the countries, libraries and collections are listed where 20 copies of the Tafhim, 24 copies of the Astrolabe, 13 copies of the Chronology, 16 copies of the Canon of Mas'ud and 4 copies of India are stored. These are mainly manuscripts from libraries in European countries. They are provided with short descriptions in English containing 10 points of information. The site also contains electronic copies of some licensed manuscripts. There are some inaccuracies on this site along with a lot of useful information. For example, the world's only manuscript of Kitāb fī ifrād al-maqāl fī amr al-aẓlāl  ("Shadows") from the Patna Khuda Bakhsh Oriental Public Library is listed here under code 2498. However, a visit to this library revealed that this manuscript is in a collection volume numbered 2519/34. The code number of the work Tamhīd al-mustaqarr li-taḥqīq maʿná al-mamarr ("Passage") from the same library is listed as 2468. In fact, this manuscript is also in the same collection volume under the number 2519/36. The treatise Maqālah fī istikhrāj al-awtār fī al-dāʾrah li-khawāṣṣ al-khāṭṭ al-munḥanī fīhā ("Chords") is also listed under the number 2468. However, it too is in the same volume under number 2519/40. "Treatise on Indian Rashiks" (HL 2519/35) is also labelled with the wrong number, 2468. The title of this treatise is listed in the library card catalog as Risālat fī Ishkāl al-Нandhasah. In the manuscript, it is given as Maqālat fī Rāshikāt al-Hind. Besides this, al-Āthār al-bāqiyyyat min al-qurūn al-khāliyyat ("Сhronology") under No. HL2218, is given as No. 963. Site address:  https://ismi.mpiwg-berlin.mpg.de/person/70924`}
        />

        <Linkify
          className="mt-2 indent-6"
          text={` In addition to the above sites, there is a special site dedicated to al-Biruni alone, created by the famous Dutch historian of science Prof. J.P. Hogendijk. It provides classified and systematized data on the manuscripts of 26 extant works of Beruni, on the research conducted on them, as well as works dedicated to al-Biruni and treatises attributed to him (apocrypha). In particular, there is a list of al-Biruni's works by D.J. Boilot (1955, 1956), as well as information from other catalogues concerning the manuscript number, its features (e.g., defect), its first researcher, and its translator. The usefulness of this site is also that, for more information on the topic, you can find links to other sites. This site is a significant aid to researchers of al-Biruni's works. Site address: www.albiruni.nl`}
        />

        <Linkify
          className="mt-2 indent-6"
          text={` The site of al-Biruni Institute of Oriental Studies heritageofberuni.uz unlike previous sites contains only biography of al-Biruni (B.Abduhalimov. Abu al-Rayhan al-Biruni: his life and works/"Abu Rayhon Beruniy ilmiy merosining jahon fani rivojidagi o'rni", Toshkent: Ma'naviyat, 2023, pp.13-36) and scientific descriptions of manuscripts of al-Biruni's works from foreign collections. The descriptions are in English and contain information on 12 points: name of the country, organization, collection where the manuscript is kept, its code, author's name, the full title of the book and its variant in the manuscript, time of writing, its language, subject, volume, illustrations, name of the scribe, date and place of copying, type of handwriting, defect (if any) and notes. Each description is supplied with three photos of the beginning, middle, and end of the manuscript. At present, the site includes descriptions of 71 manuscripts of 24 works from Iran, 36 manuscripts of 19 works (of which 3 are attributed to al-Biruni) from Turkey, 25 manuscripts of 10 works from India, 16 manuscripts of 11 works (1 of them addressed to al-Biruni, 1 is apocryphal) from the libraries of the UK, 10 manuscripts of 10 works (5 of them dedicated to al-Biruni) from the Netherlands, 8 manuscripts of 5 works stored in Germany, 5 manuscripts of 3 works from the libraries of France. In total, the site contains descriptions of 171 manuscripts of 43 titles. Of course, it is impossible to say with precision about the belonging of all 43 titles of al-Biruni. Their identification is the subject of future research.`}
        />

        <Linkify
          className="mt-2 indent-6"
          text={` In the process of describing the manuscripts, the following was revealed:`}
        />

        <Linkify
          className="mt-1"
          text={`1. Libraries in Turkey have illustrated, art decorated and antique manuscripts of al-Biruni's works, as well as copies that have their own history. For example, the Fatih Collection of the Sulaymaniyah Library contains a manuscript of a work entitled "Coordinates" copied in 416/ 1025-26 in Ghazni (No 03386). This date coincides with the time when the work was written (Oct.1025). Based on this, we can assume that it is an autograph of al-Biruni. Until now, this work was supposed to have come down to us in a single manuscript. However, during a visit to Turkey, the existence of its newest copy was found.  This manuscript was copied by Tavakkal bin Abd Allah Turkistani thumma Tashkandi in 1935 at Qandili Observatory of Bogharun University (No 00155).`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`There are many copies of the «Chronology» in world collections. The oldest of them, copied in 603/1206-1207, is also kept in Turkey, in the Bayazid Library (No B 4667). A decorated manuscript of this work with 12 illustrations is kept in the Aya Safiya collection of the Sulaymaniya Library. It was created in Samarkand for the library of Mirza Ulughbek in 839/1435-1436 (No 02947). However, this manuscript may have been taken to Istanbul after the death of Mirzа Ulughbek (1449) by his student and close friend Ali Qushchi. The oldest manuscript, dated 531/1136-1137 of al-Biruni's famous astronomical encyclopedia «Canon of Mas'ud», is also in the Sulaymaniyah Library (No. 01498).`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`Al-Biruni's only work on pharmacognosy, Kitab as-saydana fi al-tibb, which survives in a single manuscript dated 678/1279-1280, is in the Kurshunlu Jami' library in Turkey (No. 149).  In the 20th century, two copies were made in Baghdad (1935) and Cairo (1354/1936).`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={` 2. In most manuscripts of al-Biruni's works from Iran, the names of the scribe and the date of copying are given. The greatest number of copies of the "Introduction to Astrology". Its oldest manuscript dated 538/1143 is kept in the Center of Libraries, Museums and Documents of the Parliament of Iran (No. 2132)`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`The Dairat al-ma'arif has an ancient collected volume (No. 434) which includes 4 treatises of al-Biruni transcribed in 557/1162.  These are "Description of Stars and Countries" (434/2), "Cartography" (434/3), "Correction of Beginnings" (434/4) and a passage from "Canon of Mas'ud" (434/13).`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`The largest part of the «Chronology» manuscripts in Iran were copied in the 19th century.`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`The catalogue of manuscripts in Iran cites the fact that the National Library of Shiraz has a manuscript of al-Biruni's work Mulaḫḫas al-Majistī ("Abridgment of the Almagest") (FNKhE, vol. 31, p.440). However, we did not find this manuscript in this library. This treatise is also not included in the list of al-Biruni's works.`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`3. The library card index of the Salar Jung Estate Library in Hyderabad lists al-Tusi as the author of the work Kitāb fī iḫraj mā fī quwwat al-asturlāb.`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`Due to the inability to see and obtain electronic copies of all manuscripts of al-Biruni's works preserved in India, we have taken information about them from the relevant websites.`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`4. The Bodleian Library in England has a manuscript of "Canon of Mas'ud", transcribed in 475/1082 and compared with the author's copy (MS. Bodl. Or.516). Another ancient manuscript of this work, dated 501/1108, is in the National Library of France (Arabe 6840).`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={` The Berlin State Library catalog includes a manuscript of this work, dated 422/1030. However, this date is incorrect, since the work itself was written in 1037.`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`The National Library of France has a manuscript of "India" dated 544/1149, made from the author's copy (Arabe 6080).`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`On folio 2b of the British Library manuscript Kitāb al-tafhīm transcribed in 839/1435-36 there is a record that the work was written for Rayhana bint al-Hasan.`}
        />

        <Linkify
          className="mt-1 indent-6"
          text={`The website heritageofberuni.uz will continue to be updated and supplemented with new research results of al-Biruni's scientific heritage.`}
        />
      </div>

      <div className="flex flex-col gap-2 flex-[2]">
        <div>
          <img
            src="/assets/images/faya.png"
            alt="faya"
            className="flex flex-1 object-contain"
          />
          <img
            src="/assets/images/books.png"
            alt="books"
            className="flex flex-1 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPreview;
