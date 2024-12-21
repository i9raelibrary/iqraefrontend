import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const CommentsST = ({CommntData}) => {
  return (
          <div className="card h-100">
            <div className="card-header pb-0 p-3">
              <h6 className="mb-0">Comments</h6>
            </div>
            <div className="card-body pb-0 p-3">
              <ul className="list-group">
               {CommntData.map((element => 
                <li key={element.id} className="list-group-item border-0 d-flex align-items-center px-0 mb-0">
                  <div className="w-100">
                    <div className="d-flex mb-2">
                      <span className="me-2 text-sm font-weight-bold text-dark">{element.CmStatus} Comments</span>
                      <span className="ms-auto text-sm font-weight-bold">{element.porsent}%</span>
                    </div>
                    <div>
                      <div className="progress progress-md">
                        <div className={`progress-bar bg-success w-${element.porsent}`} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </li>
                ))}
              </ul>
            </div>
            <div className="card-footer pt-0 p-3 d-flex align-items-center">
              <div className="w-60">
                <p className="text-sm">
                    More than <b>1000</b> users have shared their feedback, and over <b>500</b> positive comments have been recorded.
                </p>
              </div>
              <div className="w-40 text-end">
                <a className="btn btn-dark mb-0 text-end" href="#">View all reviews</a>
              </div>
            </div>
          </div>
  )
}

export default CommentsST
