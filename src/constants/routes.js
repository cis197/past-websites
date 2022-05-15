// Internal routes
export const HOME_ROUTE = '/'
export const ASSIGNMENTS_ROUTE = '/assignments'
export const LECTURES_ROUTE = '/lectures'
export const STAFF_ROUTE = '/staff'
export const STYLE_ROUTE = '/style'
export const DEVELOPMENT_ROUTE = '/development'

// External routes
export const CAMPUS_WIRE_ROUTE = 'https://campuswire.com/c/GBED6F3F7/feed'
export const CONTACT_ROUTE = 'mailto:cbaile@seas.upenn.edu'
export const ASSIGNMENT_ZIP_ROUTE = num => {
  if (num === '1') {
    return `https://drive.google.com/file/d/1YuO8pqydwNK2LP5R4T1AAk7-5J1ZKT2E/view?usp=sharing`
  } else if (num === '2') {
    return 'https://drive.google.com/file/d/1EiokLs1EA_MhmqYV-6vCS07lQxKOsrRs/view?usp=sharing'
  } else if (num === 'pokemon-map-builder') {
    return `https://drive.google.com/file/d/1ZKNovO-v-ci3t1FsfPJLrv55EontBHes/view?usp=sharing`
  } else {
    return `https://cis.upenn.edu/~cis197/assignments/build/CIS197_HW${num}.zip`
  }
}
export const FEEDBACK_ROUTE = 'https://airtable.com/shriYlVhxB5DI4uYJ'
