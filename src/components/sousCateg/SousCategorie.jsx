import React, { useState,useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

function SousCategorie({item,articles}) {
  const [categs, setCategs] = useState([]);
  const [souscateg, setSousCateg] = useState([]);

  useEffect(() => {
    const filteredCategories = (articles[0]).filter((categorie) => categorie.parent_id === item);
    setCategs(filteredCategories);
  }, [item, articles]);

  function replaceUnderscoresWithSpaces(name) {
    return name.replace(/_/g, ' ');
  }
  return (
    <div className='sousCateg-container'>
      {categs.map((categ) => (
        <div className="sousCategName" key={categ.id}>
          <Link to={'/categories/subcategories/'+categ.id} style={{color : "orange"}} >{categ.nom_categorie && replaceUnderscoresWithSpaces(categ.nom_categorie)}</Link>
          <div>
            <table>
              {(articles[0]).filter((categorie) => categorie.parent_id === categ.id).map((sc)=>(
                <tr key={sc.id}><Link style={{color: "white"}} to={'/categories/subcategories/'+sc.id}>{sc.nom_categorie && replaceUnderscoresWithSpaces(sc.nom_categorie)}</Link></tr>
              ))}
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SousCategorie
