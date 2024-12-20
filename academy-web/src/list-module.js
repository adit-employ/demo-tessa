import dashboardModule from './modules/dashboard';
import bookingModule from './modules/booking';
import serviceAccountModule from './modules/serviceaccount';
// import brusersModule from './modules/brusers';
// import brrolesModule from './modules/brroles';
//import roleModule from './modules/role';
import ConnectingRoomModule from './modules/connectingroom';
import notfoundModule from './modules/notfound';
import authModule from './modules/auth';

// academy
// . . . Initial data
import appDataInitialModule from './modules/appdatainitialization';
// . . . Management
import appRoleModule from './modules/approle';
import appUserModule from './modules/appuser';
// . . . master
import mastersModule from './modules/masters';
import ramModule from './modules/ram';
import storageModule from './modules/storage';
import gradeModule from './modules/grade';
import locationModule from './modules/location';
import brandModule from './modules/brand';
import technologyModule from './modules/technology';
import universityModule from './modules/university';
import majorModule from './modules/major';
import emailbastModule from './modules/emailbast';
import emailreportModule from './modules/emailreport';
import assessmentclassroomModule from './modules/assessmentclassroom';
import assessmentfilteringtestModule from './modules/assessmentfilteringtest';
// . . . Assets
import laptopassetsModule from './modules/laptopassets';
// . . . Student
import studentsModule from './modules/students';
// . . . Bootcamp
import bootcampModule from './modules/bootcamp';
import bootcampapprovalModule from './modules/bootcampapproval';
import bootcampassessmenttrainerModule from './modules/bootcampassessmenttrainer';
import bootcampassessmentqcModule from './modules/bootcampassessmentqc';
import bootcampgraduateapprovalModule from './modules/bootcampgraduateapproval';


// . . .Demo
import demodashboardModule from './modules/demo';

export default {
    auth: authModule,
    dashboard: dashboardModule,
    booking: bookingModule,
    serviceAccount: serviceAccountModule,
    // brroles: brrolesModule,
    // brusers: brusersModule,    
    connectingRoom: ConnectingRoomModule,
    
    // academy
    // . . . Initial data
    appDataInitial: appDataInitialModule,
    // . . . Management
    roles: appRoleModule,
    users: appUserModule,
    // . . . Master
    master: mastersModule,
    ram: ramModule,
    storage: storageModule,
    grade: gradeModule,
    location: locationModule,
    brand: brandModule,
    technology: technologyModule,
    university: universityModule,
    major: majorModule,
    emailbast: emailbastModule,
    emailreport: emailreportModule,
    assessmentclassroom: assessmentclassroomModule,
    assessmentfilteringtest: assessmentfilteringtestModule,
    // . . . Assets
    laptopassets: laptopassetsModule,
    // . . . Students
    students: studentsModule,
    // . . . Bootcamp
    bootcamp: bootcampModule,
    bootcampapproval: bootcampapprovalModule,
    bootcampassessmenttrainer: bootcampassessmenttrainerModule,
    bootcampassessmentqc: bootcampassessmentqcModule,
    bootcampgraduateapproval: bootcampgraduateapprovalModule,


    // . . . Demo Dashboard
    demodashboard: demodashboardModule,

    // harus paling akhir
    notfound: notfoundModule
}
