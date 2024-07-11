const Home = () => {
  return (
    <div className="overflow-y-auto content flex flex-[7] md:flex-row flex-col h-full gap-4">
      <div className="flex flex-col flex-[5]">
        <p className="indent-6">
          The Al-Beruni Institute of Oriental Studies of Uzbekistan of Academy
          of Sciences has a collection of oriental manuscripts which can well
          match with any treasury of its kind of the world both in its
          scientific value and wealth. Primarily, with the aim of comprehensive
          study of rich collections of manuscripts the Institute on the Study of
          Oriental Manuscripts under the Uzbekistan Academy of Sciences was
          established in 1943. All manuscript copies kept in the Eastern
          Department of the State Public Library of the Uzbek SSR were turned
          over to the newly organized Institute.
        </p>

        <p className="mt-2 indent-6">
          At first, the Institute had only one section - on the Study of
          oriental Manuscripts. However, with the expansion of the Institute's
          researches also grew the number of these sections, including sessions
          on primary processing and classification, scientific description and
          cataloguing, research and publication of manuscript and publication of
          manuscript and documents, as well as the section on studying of
          political, economic and cultural life of neighboring foreign states
          and their relations with Central Asia. The Institute itself changed
          its name. Now it is known as the Abu Raikhan Beruni Institute of
          Oriental Studies of Academy of Sciences of the Republic of Uzbekistan.
        </p>
      </div>

      <div className="flex flex-col gap-2 flex-[2]">
        <img src="/assets/images/faya.png" alt="faya" className="flex flex-1" />
        <img
          src="/assets/images/books.png"
          alt="books"
          className="flex flex-1"
        />
      </div>
    </div>
  );
};

export default Home;
