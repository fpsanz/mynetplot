#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
mynetplot <- function(df, width = NULL, height = NULL, elementId = NULL) {

  df2 <- df %>% mutate(genes = strsplit(genes, ",") )
  df2$value = 3
  df2$color = "#ff0000"
  aux <- tibble( path=unique(unlist(df2$genes)), genes = NA, value = 1, color="#0000ff" )
  df3 <- rbind(df2,aux) %>% select(path,value,genes,color) %>% as.data.frame()
  names(df3) <- c("name","value","linkWith","color")
  dfjson <- jsonlite::toJSON(df3)
  # forward options using x
  x = list(
    data = dfjson
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'mynetplot',
    x,
    width = width,
    height = height,
    package = 'mynetplot',
    elementId = elementId
  )
}

#' Shiny bindings for mynetplot
#'
#' Output and render functions for using mynetplot within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a mynetplot
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name mynetplot-shiny
#'
#' @export
mynetplotOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'mynetplot', width, height, package = 'mynetplot')
}

#' @rdname mynetplot-shiny
#' @export
renderMynetplot <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, mynetplotOutput, env, quoted = TRUE)
}
