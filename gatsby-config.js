require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// download_data

module.exports = {
  siteMetadata: {
    titile: "Implementing"
  },
  plugins: [
    `gatsby-plugin-layout`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'LessonFile',
        path: `${__dirname}/content/lesson/`
      }
    }
  ],
}
