# Kali customizations to the default shell environment

# Add /usr/local/sbin, /usr/sbin and /sbin to the PATH for all users
if ! echo "$PATH" | tr : '\n' | grep -q "^/sbin$"; then
  PATH="/usr/local/sbin:/usr/sbin:/sbin:$PATH"
fi


## kali_treecd (<location> <package-name> <depth> <folders-only>)
kali_treecd () {
  ## Location to use: /usr/share/example
  location="${1-/}"
  ## Package name: example
  package="$2"
  ## Depth: 0-9 (default to 1)
  depth="${3:-1}"
  ## List only folders: true/false (default to true)
  folders="${4:-true}"


  ## Package Description ~ $ awk -F ': ' '/^Description: / {print $2}' ./example/debian/control
  [ ! -z "${package}" ] \
    && description="$( dpkg-query -f'${binary:Synopsis}\n' -W ${package} 2>/dev/null )"


  ## Feedback - Banner
  [ ! -z "${description}" ] \
    && echo "> ${package} ~ ${description}"


  ## Move to location
  cd "${location}"


  ## List output
  if [ "$( which tree )" ]; then
    ## Check to see if folders only
    [ "${folders}" = "true" ] \
      && folder="-d" \
      || folder=""

    ## Using tree, display output
    tree ${folder} -L ${depth} --prune --noreport "${location}"
  else
    ## Feedback - Location
    echo "${location}"

    ## Check to see if folders only
    [ "${folders}" = "true" ] \
      && folder="-type d" \
      || folder=""

    ## Using find/sed, display output
    find "${location}" -maxdepth ${depth} -mindepth 1 ${folder} \
      | sort \
      | sed -e 's/[^-][^\/]*\//-/g; s/^/  /; s/-/|/'
  fi
}
