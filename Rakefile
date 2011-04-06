#
#                   MODULE
#


TITANIUM="/Library/Application Support/Titanium/mobilesdk/osx/1.6.1/titanium.py"

desc "Build the module"
task :build do
  exec "./build.py"
end

desc "Uninstall"
task :uninstall do
  puts "\n\n\n\n UNINSTALLING      XXXXXX..."
  rm_rf "/Library/Application Support/Titanium/modules/iphone/com.mathieuravaux.ti_ios_couchbase", :verbose => true
end

desc "Install the module in /Library/Application Support/Titanium (without deflating)"
task :install => [:uninstall] do
  puts "\n\n\n\n INSTALLING..."
  cp "com.mathieuravaux.ti_ios_couchbase-iphone-0.1.zip", '/Library/Application Support/Titanium', :verbose => true
  Dir.chdir '/Library/Application Support/Titanium' do
    exec 'unzip com.mathieuravaux.ti_ios_couchbase-iphone-0.1.zip'
  end
end

desc "Test the sample application in the simulator"
task :sample => [] do
  exec TITANIUM, 'run'
end

