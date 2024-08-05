import NotifController from '../controllers/NotifController';

export const actionTypes = {
  NOTIFIKASI_NBADGE: 'NOTIFIKASI_NBADGE',
  NOTIFIKASI_NBADGE_REQUEST: 'NOTIFIKASI_NBADGE_REQUEST',
  NOTIFIKASI_NBADGE_ERROR: 'NOTIFIKASI_NBADGE_ERROR',
  NOTIFIKASI_NBADGE_SUCCESS: 'NOTIFIKASI_NBADGE_SUCCESS',
  NOTIFIKASI_NBADGE_DECREASE: 'NOTIFIKASI_NBADGE_DECREASE',
  NOTIFIKASI_NBADGE_COUNT_DECREASE: 'NOTIFIKASI_NBADGE_COUNT_DECREASE',
};

const notification_nbadgerequest = () => ({
  type: actionTypes.NOTIFIKASI_NBADGE,
  //   user,
});

const notifikasi_nbadge_success = notifDataRed => ({
  type: actionTypes.NOTIFIKASI_NBADGE_SUCCESS,
  //   user,'
  notifDataRed,
});

const notifikasi_nbadge_count_decrease = notifDataRedCount => ({
  type: actionTypes.NOTIFIKASI_NBADGE_DECREASE,
  //   user,'
  notifDataRedCount,
});

// export const notifikasi_nbadge =
//   (email, entity_cd, project_no) => async dispatch => {
//     // dispatch(notification_nbadgerequest());
//     console.log('email for notif di actions', email);
//     console.log('entity for notir', entity_cd);
//     console.log('project no for notif', project_no);
//     try {
//       const notifnbadge = await NotifController.notifikasi_nbadge(
//         email,
//         entity_cd,
//         project_no,
//       );
//       dispatch(notifikasi_nbadge_success(notifnbadge));
//       console.log('notifikasi nbadge', notifnbadge);
//       // alert("JSON.stringify(user)");
//     } catch (error) {
//       alert('error di notif action notif nbadge', error);
//     }
//     };

export const notifikasi_nbadge =
  (email, entity_cd, project_no) => async dispatch => {
    const notifnbadge = await NotifController.notifikasi_nbadge(
      email,
      entity_cd,
      project_no,
    );
    dispatch(notifikasi_nbadge_success(notifnbadge));
    // console.log('notifikasi nbadge', notifnbadge);
    //   dispatch(editRequest());
  };

// export const notifikasi_nbadge_decrease = data => async dispatch => {
//   dispatch(notifikasi_nbadge_success(notifnbadge));
//   console.log('notifikasi nbadge DECREASE', data);
//   //   dispatch(editRequest());
// };
