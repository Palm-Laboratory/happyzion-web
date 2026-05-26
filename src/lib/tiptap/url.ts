type ProtocolOptions = {
  scheme: string
  optionalSlashes?: boolean
}

type ProtocolConfig = Array<ProtocolOptions | string>

const ATTR_WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
const DOMAIN_LIKE_HREF =
  /^(?:localhost|(?:[a-z0-9-]+\.)+[a-z]{2,})(?::\d+)?(?:[/?#].*)?$/i
const MISSING_COLON_HTTP_PROTOCOL = /^(https?)\/\//i

export function isAllowedUri(
  uri: string | undefined,
  protocols?: ProtocolConfig
) {
  const allowedProtocols: string[] = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp",
  ]

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === "string" ? protocol : protocol.scheme

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol)
      }
    })
  }

  return (
    !uri ||
    uri.replace(ATTR_WHITESPACE, "").match(
      new RegExp(
        `^(?:(?:${allowedProtocols.join("|")}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`,
        "i"
      )
    )
  )
}

export function sanitizeUrl(
  inputUrl: string,
  baseUrl: string,
  protocols?: ProtocolConfig
): string {
  try {
    const url = new URL(inputUrl, baseUrl)

    if (isAllowedUri(url.href, protocols)) {
      return url.href
    }
  } catch {
    // If URL creation fails, it's considered invalid
  }
  return "#"
}

export function normalizeLinkHref(inputUrl: string): string {
  const repairedUrl = inputUrl
    .trim()
    .replace(MISSING_COLON_HTTP_PROTOCOL, "$1://")

  if (!repairedUrl) {
    return ""
  }

  if (repairedUrl.startsWith("//")) {
    return `https:${repairedUrl}`
  }

  if (repairedUrl.startsWith("/") || repairedUrl.startsWith("#")) {
    return repairedUrl
  }

  if (DOMAIN_LIKE_HREF.test(repairedUrl)) {
    return `https://${repairedUrl}`
  }

  return repairedUrl
}
