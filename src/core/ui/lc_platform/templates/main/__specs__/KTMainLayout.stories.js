// import React, { useEffect } from 'react';

// // import 'app/App.css';

// import { KTMainLayout } from '../LCMainLayout';
// import { StoreProvider } from 'core/store/store';
// import useUser from 'core/modules/user/domain/UserDomain';
// import useKTMainLayout from '../LCMainLayoutDomain';

// export default {
//   title: 'KTDesign/Templates/KTMainLayout',
//   decorators: [
//     (Story, options) => {
//       console.log(`decorators`);
//       return (
//         <StoreProvider>
//           <div
//             style={{
//               padding: '0rem !important',
//             }}
//           >
//             <Story {...options} />
//           </div>
//         </StoreProvider>
//       );
//     },
//   ],
// };

// const KTWrapper = React.memo((args) => {
//   const { user, mainLayout } = args;
//   const userDomain = useUser()[1];
//   const mainLayoutDomain = useKTMainLayout()[1];
//   let isSubscribed = true;
//   useEffect(() => {
//     // định nghĩa hàm thay thế khi load component
//     const componentDidMount = async () => {
//       if (!isSubscribed) {
//         return;
//       }
//       console.log(`Initialize KTWrapper -> componentDidMount`);
//       await userDomain.initUser(user);
//       // await mainLayoutDomain.initLayout(mainLayout);
//     };

//     componentDidMount();
//     return () => (isSubscribed = false);
//   }, []);

//   useEffect(() => {
//     console.log(`updated user` + JSON.stringify(user));
//     if (user) {
//       userDomain.updateUser(user);
//     }
//   }, [user, userDomain]);

//   useEffect(() => {
//     console.log(`updated mainLayout` + JSON.stringify(mainLayout));
//     if (mainLayout) {
//       mainLayoutDomain.updateLayout(mainLayout);
//     }
//   }, [mainLayout, mainLayoutDomain]);

//   console.log(`render KTWrapper`);
//   return (
//     <KTMainLayout>
//       <div
//         style={{
//           height: 'calc( 100vh - 168px )',
//           backgroundColor: '#f0f0f0',
//         }}
//       ></div>
//     </KTMainLayout>
//   );
// });

// const Template = (args) => <KTWrapper {...args} />;

// export const Default = Template.bind({});
// Default.parameters = {
//   layout: 'fullscreen',
//   viewport: {
//     // defaultViewport: 'LaptopHD'
//   },
// };
// Default.args = {
//   mainLayout: {
//     menuCollapsed: false,
//     subscription: 'P1',
//   },
//   user: {
//     full_name: 'FPT IS',
//     id: 415,
//     is_root: false,
//     role_id: 1,
//   },
// };

// export const FPT_Admin = Template.bind({});
// FPT_Admin.parameters = {
//   layout: 'fullscreen',
//   viewport: {
//     defaultViewport: 'LaptopHD',
//   },
// };
// FPT_Admin.args = {
//   mainLayout: {
//     menuCollapsed: false,
//   },
//   user: {
//     full_name: 'fpt_admin',
//     is_root: true,
//   },
// };

// export const P1 = Template.bind({});
// P1.parameters = {
//   layout: 'fullscreen',
//   viewport: {
//     defaultViewport: 'LaptopHD',
//   },
// };
// P1.args = {
//   mainLayout: {
//     menuCollapsed: false,
//     subscription: 'P1',
//   },
//   user: {
//     full_name: 'FPT IS P1',
//     is_root: false,
//     role_id: 1,
//   },
// };

// export const P3_Admin = Template.bind({});
// P3_Admin.parameters = {
//   layout: 'fullscreen',
//   viewport: {
//     defaultViewport: 'LaptopHD',
//   },
// };
// P3_Admin.args = {
//   mainLayout: {
//     menuCollapsed: false,
//     subscription: 'P3',
//   },
//   user: {
//     full_name: 'FPT IS Admin',
//     is_root: false,
//     role_id: 1,
//   },
// };

// export const P3_Manager = Template.bind({});
// P3_Manager.parameters = {
//   layout: 'fullscreen',
//   viewport: {
//     defaultViewport: 'LaptopHD',
//   },
// };
// P3_Manager.args = {
//   mainLayout: {
//     menuCollapsed: false,
//     subscription: 'P3',
//   },
//   user: {
//     full_name: 'FPT IS Manager',
//     is_root: false,
//     role_id: 2,
//   },
// };

// export const P3_Teacher = Template.bind({});
// P3_Teacher.parameters = {
//   layout: 'fullscreen',
//   viewport: {
//     defaultViewport: 'LaptopHD',
//   },
// };
// P3_Teacher.args = {
//   mainLayout: {
//     menuCollapsed: false,
//     subscription: 'P3',
//   },
//   user: {
//     full_name: 'FPT IS Teacher',
//     is_root: false,
//     role_id: 0,
//   },
// };
