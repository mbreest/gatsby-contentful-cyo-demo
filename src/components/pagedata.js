import { useStaticQuery, graphql } from "gatsby"

export const useDesignerData = () => {
    const { contentfulPage } = useStaticQuery(
      graphql`
        query designerDataQuery {
            contentfulPage(key: {eq: "designer"}, node_locale: {eq: "de"}) {
                slug     
            }
        }
      `
    )
    return contentfulPage
}