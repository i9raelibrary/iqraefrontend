import React, { useState } from 'react';

const Configurator = ({filters, setFilters}) => {
  const [showBar, setShowBar] = useState(false);

  

  const toggleBar = () => {
    setShowBar(!showBar);
  };

  return (
    <div>
      {!showBar && (
      <a
        className="button text-dark position-fixed px-3 py-2"
        style={{
          top: "20px",
          cursor: 'pointer',
          right: "20px",
          borderRadius: "50%",
          backgroundColor: "#f8f9fa",
          zIndex: "1050",
          boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
        }}
        onClick={toggleBar}
      >
        <i className="material-symbols-rounded py-2">settings</i>
      </a>
      )}
      {/* Barre de configuration */}
      {showBar && (
        <div
          className="card shadow-lg position-fixed"
          style={{
            top: "0px",
            right: "0px",
            height: "100%",
            width: "300px",
            zIndex: "1050",
          }}
        >
          <div className="card-header pb-0 pt-3">
            <div className="float-start">
              <h5 className="mt-3 mb-0">Order Configurator</h5>
              <p>Filter your orders.</p>
            </div>
            <div className="float-end mt-4">
              <button
                className="btn btn-link text-dark p-0 close-button"
                onClick={toggleBar}
              >
                <i className="material-symbols-rounded">clear</i>
              </button>
            </div>
          </div>
          <hr className="horizontal dark my-1" />
          <div className="card-body pt-sm-3 pt-0">
                <div className="card-header pb-0 p-3">
                  <h6 className="mb-0">Order Status</h6>
                </div>
                <div className="card-body p-3">
                  <ul className="list-group">
                    <li className="list-group-item border-0 px-0">
                      <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input mt-1 ms-auto"
                        type="checkbox"
                        id="navbarFixed"
                        checked={filters.Confirmed}
                        onChange={() => setFilters(prevFilters => ({
                          ...prevFilters,
                          Confirmed: !prevFilters.Confirmed 
                        }))}
                      />
                        <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault">Confirmed</label>
                      </div>
                    </li>
                    <li className="list-group-item border-0 px-0">
                      <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input mt-1 ms-auto"
                        type="checkbox"
                        id="navbarFixed"
                        checked={filters.Refuse}
                        onChange={() => setFilters(prevFilters => ({
                          ...prevFilters,
                          Refuse: !prevFilters.Refuse 
                        }))}
                        />
                        <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault1">Refuse</label>
                      </div>
                    </li>
                    <li className="list-group-item border-0 px-0">
                      <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input mt-1 ms-auto"
                        type="checkbox"
                        id="navbarFixed"
                        checked={filters.Waiting}
                        onChange={() => setFilters(prevFilters => ({
                          ...prevFilters,
                          Waiting: !prevFilters.Waiting 
                        }))}
                        />
                        <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault2">Waiting</label>
                      </div>
                    </li>
                    <li className="list-group-item border-0 px-0">
                      <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input mt-1 ms-auto"
                        type="checkbox"
                        id="navbarFixed"
                        checked={filters.accepted}
                        onChange={() => setFilters(prevFilters => ({
                          ...prevFilters,
                          accepted: !prevFilters.accepted 
                        }))}
                        />
                        <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault2">accepted</label>
                      </div>
                    </li>
                  </ul>
            </div>
          </div>
          <hr className="horizontal dark my-3" />
          <div className="card-body pt-sm-3 pt-0">
                <div className="card-header pb-0 p-3">
                  <h6 className="mb-0">sort by time</h6>
                </div>
                <div className="card-body p-3">
                  <ul className="list-group">
                    <li className="list-group-item border-0 px-0">
                      <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input mt-1 ms-auto"
                        type="checkbox"
                        id="navbarFixed"
                        checked={filters.the_most_recent}
                        onChange={() => setFilters(prevFilters => ({
                          ...prevFilters,
                          the_most_recent: !prevFilters.the_most_recent 
                        }))}
                        />
                        <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault">the most recent</label>
                      </div>
                    </li>
                    <li className="list-group-item border-0 px-0">
                      <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input mt-1 ms-auto"
                        type="checkbox"
                        id="navbarFixed"
                        checked={filters.the_oldest}
                        onChange={() => setFilters(prevFilters => ({
                          ...prevFilters,
                          the_oldest: !prevFilters.the_oldest 
                        }))}
                        />
                        <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault1">the oldest</label>
                      </div>
                    </li>
                  </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configurator;
