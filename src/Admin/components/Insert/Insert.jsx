import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import MYCard from '../InsertCard/MYCard'
import Loding from '../../../components/animations/loding/LodingBare/Loding'
import { useFetchAllCATEGORIESQuery } from '../../../services/CategorieApi'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Insert.css';
import { useCreateArticleMutation } from '../../../services/articleApi';
import { toast } from 'react-toastify';



const getFormattedDate = () => {
  const today = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-GB', options);
  const [day, month, year] = formattedDate.split(' ');
  return `${day} - ${month} ${year}`;
};


const Insert = () => {
  const [createArticle, { isLoading: loading, isError, isSuccess }] = useCreateArticleMutation();



  const [lastInput, setlastInput] = useState(true)
  const [ParentID, setParentID] = useState()
  const [Famille, setFamille] = useState([[]])
  const [SelectionChange, setSelectionChange] = useState([])
  const [soursArr, setSoursArr] = useState([]);
  const [Articledata, setArticledata] = useState({ nom: '', puv: '', image: null, stock: '', categorie_id: null, description: '' });

  const { data, isLoading } = useFetchAllCATEGORIESQuery();

  const categories = data ? [...data.categories] : [];

  useEffect(() => {
    const newElements = categories.filter((element) => element.parent_id === null);
    setSoursArr(newElements);
  }, [data])

  const handelCancel = () => {
    setFamille((prevFamille) => {
      if (prevFamille[0]) {
        return [prevFamille[0]];
      }
      return categories.filter((element) => element.parent_id === null)
    });
    setlastInput(true);
    setSelectionChange([]);
  }

  const handleSelectionChange = (value, index) => {
    setParentID(value)
    setSelectionChange((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[index] = value;
      return updatedSelections;
    });

    // Filtrer les nouvelles catégories basées sur la sélection
    const newElements = categories.filter((element) => element.parent_id === value);
    setSoursArr(newElements);
  };

  useEffect(() => {
    setFamille((prevFamille) => {
      if (soursArr.length > 0) {
        if (prevFamille && prevFamille[0] && prevFamille[0].length > 0) {
          setlastInput(true);
          return [...prevFamille, soursArr];
        } else {
          setlastInput(true);
          return [soursArr];
        }
      } else {
        setlastInput(false);
        setArticledata({ ...Articledata, categorie_id: ParentID ?? '' })
        return prevFamille;
      }
    });
  }, [soursArr]);

  const handleArticle = async (event) => {
    console.log(Articledata);
    event.preventDefault();
    try {
      const result = await createArticle(Articledata).unwrap();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };
  if (isLoading) { return <Loding /> }

  return (
    <div className="main-content position-relative d-flex justify-content-center max-height-vh-100 w-100 h-100">
      <div className="container-ofForm">
        <div className="page-header min-height-300 border-radius-xl mt-4"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1475243907012-e01b4e4b0a1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
        </div>
        <div className="card card-body mx-2 mx-md-2 mt-n6">
          <div className="row d-flex justify-content-between">
            <h3 className="mb-0 h4 font-weight-bolder">Insert Products</h3>
            <div className=" col-md-7 mt-4">
              <div className="shadow pt-3 pb-4 card h-100">
                <div className="d-flex justify-content-center w-100 h-100">
                  <MYCard Articledata={Articledata} setArticledata={setArticledata} />
                </div>
              </div>
            </div>
            <div className="col-md-5 mt-4">
              <div className="shadow card h-100 mb-4">
                <div className="card-header pb-0 px-3">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="mb-0">Choose a category</h6>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end align-items-center">
                      <i className="far fa-calendar-alt me-2"></i>
                      <small>{getFormattedDate()}</small>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-4 p-3">
                  <div style={{ width: '100%', margin: '0 auto' }}>
                    {Famille && Famille.length > 0 && Famille.map((element, index) => (
                      <FormControl
                        fullWidth
                        key={index}
                        sx={{
                          margin: '10px 0', // Marge en haut et en bas de 16px
                          width: '100%',
                        }}
                      >
                        <InputLabel>{`Sélectionner la catégorie`}</InputLabel>
                        <Select
                          value={SelectionChange[index] || ''}
                          label={`Sélectionner la catégorie`}
                          onChange={(e) => handleSelectionChange(e.target.value, index)}
                          disabled={index !== Famille.length - 1} // Désactive tous sauf le dernier
                        >
                          {element &&
                            element.map((category) => (
                              <MenuItem key={category.id} value={category.id}>
                                {category.nom_categorie.replace(/_/g, ' ')}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    ))}
                  </div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handelCancel}
                    style={{ width: '100%', margin: '10px 10px 10px 0' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={lastInput} // Désactivé tant que isEnabled est false
                    onClick={(event) => {
                      // alert('Bouton 2 cliqué !');
                      handleArticle(event);
                    }}
                    style={{ width: '100%', margin: '10px 10px 0 0' }}
                  >
                    INSERT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insert;



