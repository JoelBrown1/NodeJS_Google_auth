# NodeJS_Google_auth
another learning example of NodeJS using Passport

# secrets and access content
all secrets and access content is encrypted using blackbox
https://www.freecodecamp.org/news/how-to-securely-store-api-keys-4ff3ea19ebda/
https://github.com/StackExchange/blackbox
  # registering a file to be encrypted:
  blackbox_register_new_file {./folder/fileName.sufix} - {{blackbox_register_new_file config/config.env}}
  # to use files during development:
  blackbox_edit_start - blackbox_edit_start {{./config/config.env.gpg}}
  # when done:
  blackbox_edit_end

# source for tutorial:
https://www.youtube.com/watch?v=SBvmnHTQIPY 