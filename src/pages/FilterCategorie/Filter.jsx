import React, { useEffect, useState } from "react";
import {
  CategorieTree,
  FilteredProducts,
  HeaderNav,
  Navbar,
  Sidebar,
} from "../../components";
import { useFetchAllCATEGORIESQuery } from "../../services/CategorieApi";
import { useFECHSUBCATEGORIESQuery } from "../../services/CategorieApi";
import { useParams, Navigate } from "react-router-dom";
import { LodingCircular } from "../../components";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import "./filter.css";

function Filter() {
  console.log("je suis dans filter page");
  const { id } = useParams();

  const { data, isFetching } = useFetchAllCATEGORIESQuery();
  const { data: selectedCategorie, isLoading } = useFECHSUBCATEGORIESQuery(id);
  const [parentCategs, setParentCategs] = useState([]);
  const [subCategs, setSubCategs] = useState([]);
  const [appel, setAppel] = useState({});
  const [categsForFilter, setCategsForFilter] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Track if the sidebar is open
  const isAbove690px = useMediaQuery("(min-width: 690px)");
  const isAbove600px = useMediaQuery("(min-width: 600px)");
  useEffect(() => {
    if (selectedCategorie) {
      setSubCategs(selectedCategorie);
      setAppel(selectedCategorie);
    }
  }, [selectedCategorie]);

  useEffect(() => {
    const getParentCategs = () => {
      if (data && data.categories) {
        const parents = data.categories.filter(
          (categ) => categ.parent_id === null
        );
        setParentCategs(parents);
      }
    };
    getParentCategs();
  }, [data]);

  useEffect(() => {
    if (appel && appel.id) {
      setCategsForFilter((prevCateg) => {
        // Supprimer la catégorie si elle existe
        const updatedCategs = prevCateg.filter(
          (categ) => categ.id !== appel.id
        );

        if (appel.parent_id === null) {
          return [appel];
        }
        // Ajouter la catégorie à la fin du tableau
        return [...updatedCategs, appel];
      });
    }
  }, [appel]);
  const handleDelete = (categToDelete) => () => {
    setCategsForFilter((categs) =>
      categs.filter((categ) => categ.nom_categorie !== categToDelete)
    );
  };

  function replaceUnderscoresWithSpaces(name) {
    // Remplacer les underscores par des espaces
    const replaced = name.replace(/_/g, " ");

    // Mettre en majuscule la première lettre
    return replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase();
  }

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  if (isFetching) {
    return <LodingCircular />;
  }
  return (
    <>
      <HeaderNav />
      <Box>
        {isAbove690px ? (
          <Box>
            <Navbar />
          </Box>
        ) : (
          <Box>
            <Sidebar />
          </Box>
        )}
      </Box>

      <div className="filter-page-container">
        <div className="boutique-container-box">
          <div className="boxSideBar sideBardisplay">
            {isAbove600px ? (
              <Box>
                <div className="sideBar">
                  <div>
                    <div>
                      <Paper
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          listStyle: "none",
                          p: 0.5,
                          m: 0,
                        }}
                        component="ul"
                      >
                        {categsForFilter &&
                          categsForFilter.map((data, index) => {
                            return (
                              <ListItem key={index}>
                                <Chip
                                  label={replaceUnderscoresWithSpaces(
                                    data.nom_categorie
                                  )}
                                  disabled={
                                    index !== categsForFilter.length - 1
                                  }
                                  onDelete={
                                    data === "React"
                                      ? undefined
                                      : handleDelete(data.nom_categorie)
                                  }
                                />
                              </ListItem>
                            );
                          })}
                      </Paper>
                    </div>
                    <div className="tree-container">
                      {appel && (
                        <CategorieTree
                          categories={subCategs}
                          propAppel={{ appel, setAppel }}
                        />
                      )}
                    </div>
                  </div>
                  <div style={{ padding: "10px 0" }}>
                    {parentCategs &&
                      parentCategs.map((parentCateg) => {
                        return (
                          <>
                            <Link
                              key={parentCateg.id}
                              className="parent-categs"
                              to={
                                "../categories/subcategories/" + parentCateg.id
                              }
                            >
                              <p>
                                {replaceUnderscoresWithSpaces(
                                  parentCateg.nom_categorie
                                )}
                              </p>
                            </Link>
                          </>
                        );
                      })}
                  </div>
                </div>
              </Box>
            ) : (
              <Box></Box>
            )}
          </div>
          <div className="boutique-container">
            {appel && (
              <FilteredProducts
                categsFiltered={{ categsForFilter, setCategsForFilter }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
