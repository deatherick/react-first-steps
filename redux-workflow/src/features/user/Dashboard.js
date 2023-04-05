import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserByID, clearState } from './UserSlice';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isFetching, isError, id } = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchUserByID({ userId: id }));
  }, []);

  const { username, email } = useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      navigate('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <div className="container mx-auto">
      {isFetching ? (
        <TailSpin type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <div className="container mx-auto">
            Welcome back <h3>{username}</h3>
          </div>

          <button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;