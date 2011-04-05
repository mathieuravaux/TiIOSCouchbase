#
#                   MODULE
#


TITANIUM="/Library/Application Support/Titanium/mobilesdk/osx/1.6.1/titanium.py"

desc "Build the module"
task :build do
  exec "./build.py"
end

desc "Test the sample application in the simulator"
task :sample do
  exec TITANIUM, 'run'
end

desc "Install the module in /Library/Application Support/Titanium (without deflating)"
task :install do
  cp "com.mathieuravaux.ti_ios_couchbase-iphone-0.1.zip", '/Library/Application Support/Titanium', :verbose=>true
end

