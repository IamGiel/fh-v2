-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS for_hire;
-- Creates the "todolist" database --
CREATE DATABASE for_hire;

-- try to insert this to SQL PRO and INPUT THIS SINGLE DATA
INSERT INTO`Worker`(`url_link`, `name`, `zip_code`, `email`, `phone`, `service`) VALUES
( 'https://randomuser.me/api/portraits/men/54.jpg', 'Henry Webster','23810','fringilla@mollislectus.org','(447) 962 - 4448','Customer Service'),
( 'https://randomuser.me/api/portraits/men/30.jpg', 'David Griffin','50952','aliquam.enim@mollis.edu','(380) 803 - 2274','Culinary'),
( 'https://randomuser.me/api/portraits/women/20.jpg', 'Reese Logan','12058','sagittis@augueut.org','(358) 675 - 2455','Handy Work'),
( 'https://randomuser.me/api/portraits/men/57.jpg', 'Cody Jenkins','48967','a@porttitor.co.uk','(335) 244 - 7015','Customer Service'),
( 'https://randomuser.me/api/portraits/men/89.jpg', 'Matthew Johnston','43399','eu.ultrices@ultricies.net','(662) 299 - 9123','Finances'),
( 'https://randomuser.me/api/portraits/women/67.jpg', 'Eagan Heath','78405','Aenean.gravida.nunc@perconubia.edu','(126) 368 - 3259','Media'),
( 'https://randomuser.me/api/portraits/men/14.jpg', 'Lucius Newton','40538','massa@semelit.net','(505) 404 - 3271','Legal'),
( 'https://randomuser.me/api/portraits/women/95.jpg', 'Ashley Mccall','67566','vehicula.Pellentesque@quamPellentesquehabitant.org','(773) 375 - 2704','Media'),
( 'https://randomuser.me/api/portraits/women/91.jpg', 'Linda Burnett','83563','neque.non.quam@Vivamus.org','(269) 455 - 0496','Customer Service'),
( 'https://randomuser.me/api/portraits/women/70.jpg', 'Clarke Deleon','93533','sodales.elit@euismodest.co.uk','(453) 832 - 3123','Customer Service');


-- I comment out the large data below 
-- if you want to add more seeds 
-- go to worklist.handlebars
-- uncomment lines 2-18
-- it generate photos in the console (copy paste above .jpg)


-- https://randomuser.me/api/portraits/men/54.jpg
-- https://randomuser.me/api/portraits/men/30.jpg
-- https://randomuser.me/api/portraits/women/20.jpg
-- https://randomuser.me/api/portraits/men/33.jpg
-- https://randomuser.me/api/portraits/women/1.jpg
-- https://randomuser.me/api/portraits/men/57.jpg
-- https://randomuser.me/api/portraits/women/67.jpg
-- https://randomuser.me/api/portraits/men/95.jpg
-- https://randomuser.me/api/portraits/women/46.jpg
-- https://randomuser.me/api/portraits/women/86.jpg
-- https://randomuser.me/api/portraits/men/89.jpg
-- https://randomuser.me/api/portraits/women/70.jpg
-- https://randomuser.me/api/portraits/women/71.jpg
-- https://randomuser.me/api/portraits/women/91.jpg
-- https://randomuser.me/api/portraits/women/15.jpg
-- https://randomuser.me/api/portraits/men/14.jpg
-- https://randomuser.me/api/portraits/women/10.jpg
-- https://randomuser.me/api/portraits/women/3.jpg
-- https://randomuser.me/api/portraits/women/95.jpg
-- https://randomuser.me/api/portraits/men/61.jpg