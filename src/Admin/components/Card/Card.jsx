import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Card = ({ Cardname, cardVall, rank }) => {
  console.log("rank : ", rank);
  return (
    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
      <div className="card">
        <div className="card-header p-2 ps-3">
          <div className="d-flex justify-content-between">
            <div>
              <p className="text-sm mb-0 text-capitalize">{Cardname}</p>
              <h4 className="mb-0">{cardVall}</h4>
            </div>
            <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
              {
                Cardname == "Last week's revenue" ? <i className="material-symbols-rounded opacity-10">weekend</i>
                  : (Cardname == "Last week's Clients" ? <i class="material-symbols-rounded opacity-10">person</i>
                    : (Cardname == "Today's Products" ? <i class="material-symbols-rounded opacity-10">leaderboard</i>
                      : (Cardname == "Last week's Commandes" ? <i class="material-symbols-rounded opacity-10">weekend</i>
                        : null
                      )
                    )
                  )
              }
            </div>
          </div>
        </div>
        <hr className="dark horizontal my-0" />
        <div className="card-footer p-2 ps-3">
          {rank >= 0 ? <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">{rank} % </span>than the last One</p> :
            <p class="mb-0 text-sm"><span class="text-danger font-weight-bolder">{rank} %</span> than the last One</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Card;

