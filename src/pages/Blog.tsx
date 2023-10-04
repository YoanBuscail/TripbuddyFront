import picture1 from '../assets/picture1.jpg';
import picture2 from '../assets/picture2.jpg';
import picture3 from '../assets/picture3.jpg';
import BlogItem from '../components/BlogItem/BlogItem';
import Footer from '../components/Footer/Footer'

export function Blog({ title }: { title: string }) {
  return (
    <div className="blog-container">
      <h1 className="blog-title">Bien préparer son voyage</h1>
      <div className="content-container">
        <BlogItem
          imgSrc={picture1}
          imgAlt="voyage"
          title="Planification de vacances"
          content="Choisissez votre destination et fixez vos dates ! Planifiez à l'avance pour des vacances sans stress. Prendre le temps de bien organiser votre séjour vous permettra non seulement de profiter des meilleurs tarifs sur les vols et les hébergements, mais aussi de vous assurer que vous pouvez vraiment vous détendre et profiter de chaque instant de vos précieuses vacances. Alors n'attendez pas, commencez à planifier dès maintenant pour une escapade réussie !"
        />
        <BlogItem
          imgSrc={picture2}
          imgAlt="trip"
          title="Conseils d'emballage"
          content="Emballez malin, pensez essentiel ! Une valise bien organisée n'est pas seulement plus facile à transporter, mais elle peut aussi vous sauver de bien des maux de tête une fois à destination. Évitez le stress de l'oubli en préparant une liste à l'avance et en vous concentrant sur les indispensables. Vêtements polyvalents, trousse de premiers soins, documents de voyage et quelques objets de confort sont des incontournables. Laissez de côté les au cas où qui encombrent votre bagage et gâchent souvent plus qu'ils ne servent. Rappelez-vous, l'essentiel est tout ce dont vous avez vraiment besoin pour rendre votre voyage agréable et sans tracas. Alors, emballez malin et voyagez léger pour profiter pleinement de votre aventure."
        />
        <BlogItem
          imgSrc={picture3}
          imgAlt="way"
          title="Santé et voyage"
          content="Vérifiez les vaccins nécessaires et consultez un médecin avant de prendre la route. Voyager à l'étranger peut exposer votre système immunitaire à des maladies peu communes dans votre pays d'origine. Prendre rendez-vous avec un professionnel de la santé vous permettra de passer en revue les vaccins nécessaires, les boosters éventuels, et d'autres mesures préventives comme les médicaments antipaludéens. Le médecin pourra aussi vous informer sur les risques spécifiques associés à votre destination, comme la qualité de l'eau, la nourriture locale, et les maladies endémiques. Cette consultation est l'occasion de vous assurer que vous êtes en bonne santé et apte à voyager, tout en recevant des conseils pour gérer des situations médicales d'urgence qui pourraient survenir pendant votre séjour. Une préparation médicale soignée vous offre la tranquillité d'esprit nécessaire pour profiter pleinement de votre aventure."
        />

        <Footer />
      </div>
    </div>
    
  );

}

export default Blog;
